import "./computer.scss"
import Sidebar from "../../components/sidebar/SideBar"
import Navbar from "../../components/navbar/Navbar"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import firebaseDB from "../../firebase"
import { useEffect, useState } from "react"
import { memo } from "react"

const Science = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const usersRef = firebaseDB.ref("users");

    const fetchUsers = (snapshot) => {
      let list = [];
      snapshot.forEach((childSnapshot) => {
        list.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setData(list);
    };

    usersRef.on("value", fetchUsers);

    return () => {
      usersRef.off("value", fetchUsers);
    };
  }, []);

  return (
    <div className="department">
      <Sidebar/>
      <div className="departmentContainer">
        <Navbar/>
        <div className="listContainer">
          <div className="listTitle">Teacher</div>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">NAME</TableCell>
                  <TableCell className="tableCell">IMAGE</TableCell>
                  <TableCell className="tableCell">DEPARTMENT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => {
                  if (row.department === "science" && row.role==="teacher") {
                    return (
                      <TableRow key={row.id}>
                        <TableCell className="tableCell">{row.name}</TableCell>
                        <TableCell className="tableCell">
                          <div className="cellWrapper">
                            <img src={row.downloadUrl} alt="" className="image" />
                          </div>
                        </TableCell>
                        <TableCell className="tableCell">{row.department}</TableCell>
                      </TableRow>
                    );
                  }
                  return null; // Skip rendering if role is not "computer"
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="listContainer">
          <div className="listTitle">Students</div>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">NAME</TableCell>
                  <TableCell className="tableCell">IMAGE</TableCell>
                  <TableCell className="tableCell">DEPARTMENT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => {
                  if (row.department === "science" && row.role === "student") {
                    return (
                      <TableRow key={row.id}>
                        <TableCell className="tableCell">{row.name}</TableCell>
                        <TableCell className="tableCell">
                          <div className="cellWrapper">
                            <img src={row.downloadUrl} alt="" className="image" />
                          </div>
                        </TableCell>
                        <TableCell className="tableCell">{row.department}</TableCell>
                      </TableRow>
                    );
                  }
                  return null; // Skip rendering if role is not "computer"
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default memo(Science);
