import React from "react";
import { useLocation } from "react-router-dom";

const ViewImage = () => {
  const location = useLocation();
  return (
    <>
      {console.log(location.state?.image)}
      <img src={location.state?.image}/>
    </>
  );
};

export default ViewImage;
