"""
Evaluation script for DengueNet with Indian data.
"""
import os
from pathlib import Path
import pandas as pd
import sys
import argparse
import tensorflow as tf
from datetime import datetime

# Add parent directory to path for imports
root_dir = Path(__file__).parents[1]
sys.path.insert(0, str(root_dir / "util"))
sys.path.insert(0, str(root_dir / "model"))
sys.path.insert(0, str(root_dir / "config"))

from DengueNet import *
from DataPreprocess import *
from DataPreprocess_India import setup_india
from ModelUtil import *
from ForFeatureEngineering import getFeatureList, getThresholdPairList
from CalculateMetric import evalModel, plotModelStructure
from india_config import *

def setParser(include_vit=False):
    parser = argparse.ArgumentParser(description='Evaluate DengueNet with Indian data')
    parser.add_argument('--project_folder', type=str, default='/path/to/project', help='Project folder path')
    parser.add_argument('--gpu_index', type=str, default='0', help='GPU index to use')
    parser.add_argument('--gpu_size', type=int, default=10, help='GPU memory to use (GB)')
    parser.add_argument('--limit_gpu', action='store_true', help='Limit GPU memory usage')
    parser.add_argument('--city', type=int, default=None, help='City index to process (0-4)')
    parser.add_argument('--fixed_thres', action='store_true', help='Use fixed cloud/shadow thresholds')
    parser.add_argument('--cloud_threshold', type=int, default=CLOUD_THRESHOLD, help='Cloud threshold')
    parser.add_argument('--shadow_threshold', type=int, default=SHADOW_THRESHOLD, help='Shadow threshold')
    parser.add_argument('--reverse_city_sequence', action='store_true', help='Reverse city processing order')
    parser.add_argument('--include_vit', action='store_true', default=include_vit, help='Include ViT models')
    parser.add_argument('--country', type=str, default='india', help='Country to use (colombia or india)')
    return parser.parse_args()

def main(args):
    selected_feature_ls = SELECTED_FEATURES
    leaky_rate_ls = getLeakyRateList()
    threshold_pair_ls = list(getThresholdPairList(args))
    lstm_week_ls = LSTM_WEEKS
    vit_norm_ls = [False]

    date = datetime.now().strftime("%H:%M:%S_%d-%m-%Y") + ".log"
    if args.include_vit:
        print("Include ViT model!!")
        model_dic = getModels(True)
    else:
        model_dic = getModels(False)
    
    city_ls = getCityList(args.reverse_city_sequence, args.country)
    len_callback = 10

    if args.city is not None:
        city_ls = [city_ls[args.city]]

    for city in city_ls:
        path = Path(f"{BASE_DATA_PATH}/sorted/{city}")
        df = pd.read_csv(path / "label.csv")
        all_feature_ls = readFeatureName(df, path)
        threshold_path = path / "threshold.pickle"

        if os.path.exists(threshold_path):
            with open(threshold_path, "rb") as f:
                threshold_dic = pickle.load(f)
        else:
            img_ls, _ = readImgs(df, path)
            threshold_dic = getThresholds(img_ls)

        for model_name in model_dic.keys():
            swap_bool_ls = [True, False]
            if model_name == "Case":
                swap_bool_ls = [False]

            for swap in swap_bool_ls:
                for vit_norm in vit_norm_ls:
                    for cloud, shadow in threshold_pair_ls:
                        for vit_trainable in [True]:  # Use trainable ViT model
                            for lstm_week in lstm_week_ls:
                                df_columns = [
                                    "train_MAE",
                                    "val_MAE",
                                    "test_MAE",
                                    "train_sMAPE",
                                    "val_sMAPE",
                                    "test_sMAPE",
                                    "train_RMSE",
                                    "val_RMSE",
                                    "test_RMSE",
                                ]
                                result_df = pd.DataFrame(columns=df_columns)

                                for leaky_rate in leaky_rate_ls:
                                    feature_folder_name = getFeatureFolderName(
                                        all_feature_ls, selected_feature_ls
                                    )
                                    setting = getSetting(
                                        args.project_folder,
                                        swap,
                                        model_name,
                                        city,
                                        include_top=False,
                                        threshold_dic=threshold_dic,
                                        selected_feature_ls=selected_feature_ls,
                                        threshold_cloud=cloud,
                                        threshold_shadow=shadow,
                                        feature_folder_name=feature_folder_name,
                                        lstm_week=lstm_week,
                                    )
                                    
                                    # Add India-specific settings
                                    setting["country"] = args.country

                                    selected_model = (
                                        str(lstm_week)
                                        + "/"
                                        + setting["model"]
                                        + "_"
                                        + str(swap)
                                        + "/"
                                    )
                                    if vit_norm:
                                        selected_model += "NormImg"
                                    else:
                                        selected_model += "OriginImg"

                                    df_location = (
                                        Path(setting["result_folder"])
                                        / selected_model
                                        / "result.csv"
                                    )
                                    model_parameter = (
                                        DengueNet.getHyperparameter(
                                            leaky_rate=leaky_rate,
                                            vit_trainable=vit_trainable,
                                        )
                                        + "_"
                                        + str(len_callback)
                                    )
                                    model_location = getResultLocation(
                                        args,
                                        setting["model_folder"],
                                        selected_model,
                                        model_parameter,
                                    )
                                    result_location = getResultLocation(
                                        args,
                                        setting["result_folder"],
                                        selected_model,
                                        model_parameter,
                                    )
                                    print(model_location)

                                    if os.path.exists(result_location / "history.png"):
                                        print(
                                            f"Error!! Folder {result_location} already existed!!"
                                        )
                                        continue

                                    checkFolder(result_location)
                                    checkFolder(model_location)
                                    
                                    # Use India-specific setup function
                                    if args.country.lower() == "india":
                                        setting, data, labels, scaler = setup_india(
                                            setting, city, normalize_vit=vit_norm
                                        )
                                    else:
                                        setting, data, labels, scaler = setup(
                                            setting, city, normalize_vit=vit_norm
                                        )
                                        
                                    data = getInput(model_name, data, labels)

                                    printTime("Model Training (fixed parameter)", 1)
                                    model = createModel(setting, leaky_rate)
                                    history = model.fit(
                                        data["train"]["input"],
                                        data["train"]["output"],
                                        epochs=150,
                                        batch_size=8,
                                        validation_data=(
                                            data["val"]["input"],
                                            data["val"]["output"],
                                        ),
                                        callbacks=getCallback(len_callback),
                                    )
                                    printTime("Model Training (fixed parameter)")

                                    printTime("Model Evaluation", 1)
                                    f = open(result_location / str(date), "w")
                                    plotModelStructure(model, result_location)
                                    performance = evalModel(
                                        model, data, f, result_location, scaler, history
                                    )
                                    printTime("Model Evaluation")

                                    tmp_dic = {"leaky_rate": leaky_rate}
                                    for split in performance.keys():
                                        for metric in performance[split].keys():
                                            print(
                                                f"{split}_{metric}",
                                                performance[split][metric],
                                            )
                                            tmp_dic[f"{split}_{metric}"] = performance[
                                                split
                                            ][metric]
                                    result_df = result_df.append(
                                        tmp_dic, ignore_index=True
                                    )
                                result_df.to_csv(df_location, index=False)


if __name__ == "__main__":
    args = setParser(True)
    os.environ["CUDA_VISIBLE_DEVICES"] = args.gpu_index
    gpus = tf.config.list_physical_devices("GPU")

    if gpus:
        try:
            if args.limit_gpu:
                tf.config.set_logical_device_configuration(
                    gpus[0],
                    [
                        tf.config.LogicalDeviceConfiguration(
                            memory_limit=args.gpu_size * 1024
                        )
                    ],
                )
            logical_gpus = tf.config.list_logical_devices("GPU")
            print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
        except RuntimeError as e:
            print(e)

    main(args)

