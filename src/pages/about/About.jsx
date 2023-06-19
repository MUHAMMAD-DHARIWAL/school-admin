import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import "./about.scss";
import List  from "../../components/datatable/DataTable";
// import Widget from "../../components/widget/Widget";
// import Featured from "../../components/featured/Featured";
import Chart from "../../components/Charts/Chart";
// import Table from "../../components/table/Table";

const About = () => {
  return (
    <div className="about">
      <div className="homeContainer">
        <Navbar />
        
        <div className="widgets">
          {/* <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" /> */}
        </div>
      </div>
    </div>
  );
};

export default About;