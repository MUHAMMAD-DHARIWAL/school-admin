import "./datatable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import  firebaseDB  from "../../firebase";

const List = () => {

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
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> ID</TableCell>
            <TableCell className="tableCell">IMAGE</TableCell>
            <TableCell className="tableCell">NAME</TableCell>
            <TableCell className="tableCell">DEPARTMENT</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
          <TableRow key={row.id}>
          <TableCell className="tableCell">{index + 1}</TableCell>
          <TableCell className="tableCell">
          <div className="cellWrapper">
          <img src={row.downloadUrl} alt="" className="image" />
          </div>
          </TableCell>
          <TableCell className="tableCell">{row.name}</TableCell>
          <TableCell className="tableCell">{row.department}</TableCell>
          <TableCell className="tableCell">
      <span className={`status ${row.role}`}>{row.role}</span>
    </TableCell>
  </TableRow>
))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;