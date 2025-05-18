import React from "react";
import service1 from "./assets/Rakel1.jpg"; // Main image

const DiscoverContainer = () => {
  return (
    <div className="container mt-2 mb-4"> {/* Reduced vertical spacing */}
      <h2 className="text-center mb-4">Meet Your Freelance Expert</h2>
      <div className="row align-items-center">
        <div className="col-md-5 text-center">
          <img
            src={service1}
            alt="Freelancer"
            className="rounded shadow"
            style={{
              maxHeight: "300px",   // Limit height
              width: "autopx",        // Preserve aspect ratio
              maxWidth: "100%",     // Responsive
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-md-7">
          <h3 className="fw-bold">Rachael Nasipwondi Wabwoba</h3>
          <h5 className="text-muted mb-3">Freelance CV & Social Media accounts manager Specialist</h5>
          <p>
            I help professionals unlock career opportunities through expertly crafted CVs,
            optimized LinkedIn profiles, and persuasive cover letters. With a keen eye for detail
            and industry-tailored strategies, I ensure you stand out to recruiters and employers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscoverContainer;
