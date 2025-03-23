import React from "react";
import "./caseStudies.css";
import { FaHospital, FaBuilding, FaSeedling, FaPlane } from "react-icons/fa";
import { useInView } from "react-intersection-observer"; 
import hospitalImg from "../hospital.png";
import governmentImg from "../policy.png";
import agricultureImg from "../agriculture.png";
import tourismImg from "../travel.png";

const CaseStudies = () => {
  const caseStudies = [
    {
      icon: <FaHospital />,
      title: "Public Health & Hospitals",
      description: "By predicting dengue outbreaks 5 weeks in advance, Prognosis has significantly helped hospitals optimize their resources, allowing for better preparedness and resource allocation. This has resulted in a 15% reduction in ICU admissions during outbreaks, and hospitals have been able to allocate critical resources more efficiently, ensuring that care is provided to those most in need. Furthermore, hospitals have reduced their overall operational costs, increasing patient care efficiency during high-demand periods.",
      impact: ["Early Warning System", "Better Resource Allocation", "Reduced Hospital Costs"],
      image: hospitalImg,
    },
    {
      icon: <FaBuilding />,
      title: "Government & Policy Planning",
      description: "Prognosis has empowered governments to take data-driven decisions, improving health monitoring and prevention strategies. By predicting dengue outbreaks and tracking their spread, governments have been able to allocate resources more effectively and reduce dengue cases by 18%. This proactive approach has led to significant savings of ₹50 crore annually in healthcare costs, demonstrating the power of predictive analytics in public health policy.",
      impact: ["Data-Driven Prevention", "Smart Budget Allocation", "Stronger Public Health"],
      image: governmentImg,
    },
    {
      icon: <FaSeedling />,
      title: "Agriculture & Rural Health",
      description: "Farmers in rural areas face significant challenges when disease outbreaks occur, especially in regions where healthcare access is limited. Prognosis has helped prevent dengue outbreaks in farming communities, reducing absenteeism by 40%. By ensuring farmers stay healthy and productive, this initiative has also minimized economic losses in rural economies. With this technology, agricultural workforces can continue functioning, preserving both the community's health and economic stability.",
      impact: ["Farmer Health", "Minimized Economic Loss", "Stronger Rural Health"],
      image: agricultureImg,
    },
    {
      icon: <FaPlane />,
      title: "Travel & Tourism",
      description: "Travelers often face health risks when visiting areas with outbreaks of diseases like dengue. Prognosis has been used to inform travelers about the risks in their destinations, leading to a reduction in travel disruptions by 12%. Additionally, tourism businesses, particularly hotels and resorts, have adopted preventive measures, ensuring that travelers can enjoy their vacations without health concerns. This not only boosts tourism confidence but also promotes the long-term sustainability of safe travel experiences.",
      impact: ["Safe Destinations", "Boosted Tourism Confidence", "Proactive Health Monitoring"],
      image: tourismImg,
    },
  ];

  const { ref: caseStudyRef1, inView: inView1 } = useInView({
    threshold: 0.3,
  });

  const { ref: caseStudyRef2, inView: inView2 } = useInView({
    threshold: 0.3,
  });

  const { ref: caseStudyRef3, inView: inView3 } = useInView({
    threshold: 0.3,
  });

  const { ref: caseStudyRef4, inView: inView4 } = useInView({
    threshold: 0.3,
  });

  const { ref: headerRef, inView: inViewHeader } = useInView({
    threshold: 0.3,
  });

  return (
    <section className="case-studies">
      <div
        ref={headerRef}
        className={`case-header ${inViewHeader ? "animate" : ""}`}
      >
        <h2>Success Stories</h2>
        <p>Explore how our tailored strategies have transformed businesses and driven measurable success for our clients.</p>
        <div className="case-actions">
          <button className="contact-button">Contact</button>
          <button className="trial-button">Free trial</button>
        </div>
      </div>

      <p className="case-intro">Real Results, Real Impact - Explore how Prognosis is transforming disease prediction and prevention.</p>

      <div className="case-grid">
        {caseStudies.map((study, index) => {
          const inView = index === 0 ? inView1 : index === 1 ? inView2 : index === 2 ? inView3 : inView4;
          const ref = index === 0 ? caseStudyRef1 : index === 1 ? caseStudyRef2 : index === 2 ? caseStudyRef3 : caseStudyRef4;

          return (
            <div
              key={index}
              ref={ref}
              className={`case-study ${index % 2 === 0 ? "reverse" : "reverse"} ${inView ? "animate" : ""}`}
            >
              <div className="case-content">
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <div className="impacts">
                  {study.impact.map((point, idx) => (
                    <div key={idx} className="impact">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
              <div className="case-image">
                <img src={study.image} alt={study.title} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CaseStudies;
