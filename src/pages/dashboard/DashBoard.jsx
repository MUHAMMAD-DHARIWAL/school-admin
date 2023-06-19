import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import "./dashboard.scss";
import List  from "../../components/datatable/DataTable";
// import Widget from "../../components/widget/Widget";
// import Featured from "../../components/featured/Featured";
import Chart from "../../components/Charts/Chart";
// import Table from "../../components/table/Table";
import { memo } from "react";

const HomeView = () => {
  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {/* <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" /> */}
        </div>
        <div className="charts">
          {/* <Featured /> */}
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Home Page</div>
          <List/>
          {/* <Table /> */}
        </div>
      </div>
    </div>
  );
};

export default memo(HomeView);