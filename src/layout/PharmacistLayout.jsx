import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PharmacistLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
