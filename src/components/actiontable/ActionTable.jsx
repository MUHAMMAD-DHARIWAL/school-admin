import React, { useEffect, useState, memo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import firebaseDB from "../../firebase";
import "./actiontable.scss";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const usersRef = firebaseDB.ref("users");

    const fetchData = (snapshot) => {
      const userList = snapshot.val();
      const list = Object.entries(userList).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setData(list);
    };

    usersRef.on("value", fetchData);

    return () => {
      usersRef.off("value", fetchData);
    };
  }, []);

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "downloadUrl",
      headerName: "image",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.downloadUrl} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 130,
    },
    {
      field: "role",
      headerName: "Role",
      type: "text",
      width: 130,
    },
    {
      field: "department",
      headerName: "Department",
      width: 130,
    },
  ];

  const handleDelete = async (id) => {
    try {
      await firebaseDB.ref("users").child(id).remove();
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/student/view/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        USER TABLE
        <Link to="/student/create" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default memo(Datatable);
