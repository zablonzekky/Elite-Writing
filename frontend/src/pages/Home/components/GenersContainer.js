import React from "react";
//import "./DiscoverContainer.css"; // For optional custom styles
import service1 from "./assets/image.png";        // Sample images
import service2 from "./assets/auth.png";
import service3 from "./assets/preview.png";

const services = [
  {
    image: service1,
    title: "CV Writing",
    description: "Get professionally written CVs tailored to your industry and career goals.",
  },
  {
    image: service2,
    title: "LinkedIn Optimization",
    description: "Enhance your LinkedIn profile to attract recruiters and boost visibility.",
  },
  {
    image: service3,
    title: "Cover Letter Writing",
    description: "Craft compelling cover letters that highlight your skills and experience.",
  },
];

const GenersContainer= () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Core Services</h2>
      <div className="row">
        {services.map((service, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={service.image} className="card-img-top" alt={service.title} />
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenersContainer;
