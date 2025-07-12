import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useLoading } from "../context/LoadingContext/LoadingContext";
import { loaderHandlers } from "../network/interceptor";
import { useEffect } from "react";

const LayoutPage = function () {
  const { showLoader, hideLoader } = useLoading();
  useEffect(() => {
    loaderHandlers({ showLoader, hideLoader });
  }, [showLoader, hideLoader]);

  return (
    <>
      <Navbar />
      <main>
        <Loader />
        <Outlet />
      </main>
    </>
  );
};

export default LayoutPage;
