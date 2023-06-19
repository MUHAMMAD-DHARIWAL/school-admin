import "./profile.scss";
import Sidebar from "../../components/sidebar/SideBar.jsx";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import firebaseDB from '../../firebase';
import { AuthContext } from '../../Context/AuthContext';

const Profile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const userId = id || currentUser?.uid;
  
    if (userId) {
      const userRef = firebaseDB.ref(`users/${userId}`);
      
      const fetchData = (snapshot) => {
        if (snapshot.exists()) {
          const empData = snapshot.val();
          setEmployee(empData);
        }
      };
  
      userRef.on("value", fetchData);
  
      return () => {
        userRef.off("value", fetchData);
      };
    }
  }, [id, currentUser]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          {employee ? (
            <div className="left">
              <h1 className="title"> Profile</h1>
              <div className="item">
                <img
                  src={employee.downloadUrl}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{employee.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{employee.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{employee.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Role:</span>
                    <span className="itemValue">{employee.role}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Department:</span>
                    <span className="itemValue">{employee.department}</span>
                  </div>
                </div>
                {id === currentUser?.uid && (
                  <div className="cellAction">
                    <Link to={`/student/edit/${id}`} style={{ textDecoration: "none" }}>
                      <div className="viewButton">Edit</div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
