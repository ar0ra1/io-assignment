import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SingleUser = () => {
  const location = useLocation();
  const user = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <main className="flex flex-col justify-center w-full gap-4 text-center text-white my-7">
      <div className="flex items-center justify-center py-10">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-transparent border-2 rounded dark:border-gray-500"
        >
          Go back
        </button>
      </div>
      {user ? (
        <div className="flex flex-col items-center gap-4 ">
          <img
            loading="lazy"
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last} | ${user.nat}`}
            width={256}
            height={256}
            data-testid={"user-picture"}
          />
          <div className="flex flex-col items-center">
            <h2
              data-testid={"user-basicDetails"}
              className="py-2 text-2xl font-bold "
            >
              {user.name.first} {user.name.last}{" "}
              {user.login.username && `@${user.login.username}`}
            </h2>
            <h3 className="text-sm">
              ({user.gender} - {user.nat})
            </h3>
          </div>
          <div className="flex flex-col gap-4 md:inline-flex md:flex-row">
            <p data-test={"user-cell"}>{user.cell}</p>
            <p data-test={"user-phone"}>{user.phone}</p>
            <p data-test={"user-email"}>{user.email}</p>
          </div>
          <div>
            <p data-testid="user-dob">
              Date of Birth: {new Date(user.dob.date).toLocaleDateString()}
            </p>
            <p>Age: {user.dob.age}</p>
          </div>
          <p>
            Registered On :{" "}
            {new Date(user.registered.date).toLocaleDateString()} at age{" "}
            {user.registered.age}
          </p>
          <address>
            <p>
              {user.location.street.number} {user.location.street.name}
            </p>
            <p>
              {user.location.city} {user.location.state}
            </p>
            <p>
              {user.location.country} {user.location.postcode}
            </p>
          </address>
        </div>
      ) : (
        <h2 data-testid="missing-data" className="text-white">
          Something went wrong...
        </h2>
      )}
    </main>
  );
};
