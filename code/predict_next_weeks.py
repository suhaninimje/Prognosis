# predict_next_weeks.py
import os
import numpy as np
import torch
from pathlib import Path
import json
from epiweeks import Week
from datetime import datetime, timedelta

from sklearn.decomposition import PCA
from sklearn.preprocessing import MinMaxScaler

# Load the model (from current workspace)
import torch.nn as nn

class flightLSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super().__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc_1 = nn.Linear(hidden_size,128)
        self.relu = nn.ReLU()
        self.fc   = nn.Linear(128, output_size)   

    def forward(self, x, hs, cs):
        out, (hs,cs) = self.lstm(x, (hs,cs))
        out = out[:, -1, :]  # use last time step output only
        out = self.fc_1(out)
        out = self.relu(out)
        out = self.fc(out)       
        return out


def get_next_epiweeks(start_epiweek, num_weeks):
    y, w = int(str(start_epiweek)[:4]), int(str(start_epiweek)[4:])
    start = Week(y, w)
    return [(start + i).year * 100 + (start + i).week for i in range(num_weeks)]


def autoregressive_predict(model, initial_seq, device, num_weeks=5):
    model.eval()
    predictions = []
    current_seq = initial_seq.copy()

    with torch.no_grad():
        for _ in range(num_weeks):
            x = torch.tensor(current_seq).float().to(device)
            hs = torch.zeros(model.num_layers, x.size(0), model.hidden_size).to(device)
            cs = torch.zeros(model.num_layers, x.size(0), model.hidden_size).to(device)
            pred = model(x, hs, cs)
            pred_val = pred[0].cpu().numpy().item()
            predictions.append(pred_val)

            # Append the prediction to current_seq for next iteration
            next_input = np.zeros((1, 1, current_seq.shape[2]))
            next_input[0, 0, 0] = pred_val  # Inject prediction at feature index 0
            current_seq = np.concatenate([current_seq[:,1:,:], next_input], axis=1)

    return predictions


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--project_folder", type=str, required=True)
    parser.add_argument("--start_epiweek", type=int, default=None)
    parser.add_argument("--weeks_ahead", type=int, default=5)
    parser.add_argument("--lstm_weeks", type=int, default=10)
    parser.add_argument("--load_model_path", type=str, default="")
    args = parser.parse_args()

    #print("Loading model...")
    input_size = 13
    model = flightLSTM(input_size=input_size, hidden_size=230, num_layers=2, output_size=1)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    if args.load_model_path and os.path.exists(args.load_model_path):
        model.load_state_dict(torch.load(args.load_model_path, map_location=device))
        #print("Loaded weights from:", args.load_model_path)
    else:
        pass
        #print("WARNING: No weights loaded. You must train and save weights using the training script.")

    #print("Generating predictions...")
    # Dummy initial sequence — Replace with real data loading
    np.random.seed(42)
    initial_seq = np.random.rand(1, args.lstm_weeks, input_size)

    preds = autoregressive_predict(model, initial_seq, device, args.weeks_ahead)

    if args.start_epiweek:
        epiweeks = get_next_epiweeks(args.start_epiweek, args.weeks_ahead)
    else:
        today = datetime.today()
        start_epi = Week.fromdate(today).year * 100 + Week.fromdate(today).week
        epiweeks = get_next_epiweeks(start_epi, args.weeks_ahead)

    result = [{"epiweek": ew, "prediction": round(p, 2)} for ew, p in zip(epiweeks, preds)]
    out_path = Path(args.project_folder) / "next_week_preds.json"
    with open(out_path, "w") as f:
        json.dump(result, f, indent=2)

    #print("Saved predictions to", out_path)
    print(json.dumps(result, indent=2))
    return json.dumps(result, indent=2)


if __name__ == "__main__":
    main()

