import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const UserReviews = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/user/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  const dummyReviews = [
    "Excellent CV writing service, I landed 3 interviews in a week!",
    "The LinkedIn optimization really helped recruiters notice me.",
    "Very professional and responsive—highly recommended!",
    "My cover letter was spot on, thank you!",
    "Great service with attention to detail!"
  ];

  const getRandomReview = () =>
    dummyReviews[Math.floor(Math.random() * dummyReviews.length)];

  const getRandomRating = () => Math.floor(Math.random() * 2) + 4; // 4 or 5

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">What Our Clients Say</h2>
      <div className="row">
        {users &&
          users.map((user, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={user.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <img
                    src={`http://localhost:5000/${user.image}`}
                    alt={user.name}
                    className="rounded-circle mb-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text text-muted" style={{ fontSize: "0.95rem" }}>
                    "{getRandomReview()}"
                  </p>
                  <div className="text-warning">
                    {"★".repeat(getRandomRating()) + "☆".repeat(5 - getRandomRating())}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserReviews;
