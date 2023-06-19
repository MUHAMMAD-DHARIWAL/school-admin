import "./homeview.scss";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import firebaseDB from '../../firebase';
import Background from "../../assets/background-image.jpg"
// import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";

const HomeView = () => {
  
  
  return (
    <div className="single">
      <Navbar />
      <img src={Background} alt="" width="1550" height="1080" /> 
     
      </div>
  );
};

export default HomeView;
