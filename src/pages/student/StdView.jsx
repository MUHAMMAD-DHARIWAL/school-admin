import "./stdview.scss";
import Sidebar from "../../components/sidebar/SideBar.jsx";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import firebaseDB from '../../firebase';
import { ref, onValue, off } from "firebase/database";
import { memo } from "react";
// import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";

const StdView = () => {
  const {id}  = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const employeeRef = ref(firebaseDB, `users/${id}`);

    const onEmployeeValue = (snapshot) => {
      if (snapshot.exists()) {
        const empData = snapshot.val();
        setEmployee(empData);
      }
    };

    onValue(employeeRef, onEmployeeValue);

    return () => {
      off(employeeRef, "value", onEmployeeValue);
    };
  }, [id]);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          {employee ? (
            <div className="left">
              <h1 className="title"> USER INFORMATION</h1>
              <div className="item">
                <img
                  src={employee.downloadUrl}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{ employee.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{employee.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{ employee.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Role:</span>
                    <span className="itemValue">
                      {employee.role}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Department:</span>
                    <span className="itemValue">{employee.department }</span>
                  </div>
                </div>
                <div className="cellAction">
          <Link to= {`/student/edit/${id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">Edit</div>
          </Link>
          </div>
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default memo(StdView);
