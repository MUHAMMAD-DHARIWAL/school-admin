// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import Sidebar from "../../components/sidebar/SideBar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import firebaseDB, { storage } from "../../firebase";
// import { ref as dbRef, set, onValue, off } from "firebase/database";

// const StdEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [department, setDepartment] = useState("");
//   const [file, setFile] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(null);

//   const nameRegex = /^[a-zA-Z ]+$/;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^\d{10}$/;
//   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//   useEffect(() => {
//     const uploadFile = async () => {
//       if (!file) return;

//       const name = new Date().getTime() + file.name;

//       try {
//         const storageRef = ref(storage, `images/${name}`);
//         const uploadTask = uploadBytesResumable(storageRef, file);

//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log("Upload is " + progress + "% done");
//             setUploadProgress(progress);
//           },
//           (error) => {
//             console.log(error);
//           },
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref)
//               .then((downloadURL) => {
//                 console.log(downloadURL);
//                 setDownloadUrl(downloadURL);
//               })
//               .catch((error) => {
//                 console.log(error);
//               });
//           }
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     uploadFile();
//   }, [file]);

//   useEffect(() => {
//     const fetchUserData = () => {
//       const userRef = dbRef(firebaseDB, `users/${id}`);
//       onValue(userRef, (snapshot) => {
//         if (snapshot.exists()) {
//           const empData = snapshot.val();
//           setName(empData.name);
//           setEmail(empData.email);
//           setPhone(empData.phone);
//           setPassword(empData.password);
//           setDepartment(empData.department);
//           setRole(empData.role);
//         }
//       });
//     };
  
//     fetchUserData();
  
//     return () => {
//       const userRef = dbRef(firebaseDB, `users/${id}`);
//       off(userRef);
//     };
//   }, [id]);
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     if (!nameRegex.test(name)) {
//       alert("Please enter a name without numbers and special characters");
//       return;
//     }
  
//     if (!emailRegex.test(email)) {
//       alert("Please enter a valid email address");
//       return;
//     }
  
//     if (!phoneRegex.test(phone)) {
//       alert("Please enter a valid 10-digit phone number");
//       return;
//     }
  
//     if (!passwordRegex.test(password)) {
//       alert(
//         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and must be at least 8 characters long"
//       );
//       return;
//     }
  
//     const empData = {
//       name,
//       email,
//       password,
//       phone,
//       role,
//       department,
//       downloadUrl,
//     };
  
//     const userRef = dbRef(firebaseDB, `users/${id}`);
//     set(userRef, empData) // Use set method to update the data
//       .then(() => {
//         alert("Saved successfully.");
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };
  

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>Add New User</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <img
//               src={
//                 file
//                   ? URL.createObjectURL(file)
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form onSubmit={handleSubmit}>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                 />
//               </div>
//               <div className="formInput">
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="john-doe"
//                 />
//                 {name.length > 5 && !nameRegex.test(name) && (
//                   <span className="text-danger">
//                     Enter a name without numbers and special characters
//                   </span>
//                 )}
//               </div>
//               <div className="formInput">
//                 <label>Email</label>
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="john-doe@example.com"
//                 />
//                 {email.length > 0 && !emailRegex.test(email) && (
//                   <span className="text-danger">
//                     Enter a valid email address
//                   </span>
//                 )}
//               </div>
//               <div className="formInput">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="********"
//                 />
//                 {!passwordRegex.test(password) && password.length > 0 && (
//                   <span className="text-danger">
//                     Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and must be at least 8 characters long
//                   </span>
//                 )}
//               </div>
//               <div className="formInput">
//                 <label>Phone</label>
//                 <input
//                   type="number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="1234567890"
//                 />
//                 {phone.length > 0 && !phoneRegex.test(phone) && (
//                   <span className="text-danger">
//                     Enter a valid phone number
//                   </span>
//                 )}
//               </div>
//               <div className="formInput">
//                 <label>Role</label>
//                 <select
//                   className="drop"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                 >
//                   <option value="">Select</option>
//                   <option value="teacher">Teacher</option>
//                   <option value="student">Student</option>
//                 </select>
//               </div>
//               <div className="formInput">
//                 <label>Department</label>
//                 <select
//                   className="drop"
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                 >
//                   <option value="">Select</option>
//                   <option value="science">Science</option>
//                   <option value="computer">Computer</option>
//                   <option value="arts">Arts</option>
//                 </select>
//               </div>
//               <button
//                 disabled={uploadProgress !== null && uploadProgress < 100}
//                 type="submit"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StdEdit;
import "./stdedit.scss";
import Sidebar from "../../components/sidebar/SideBar.jsx";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import firebaseDB from '../../firebase';
import { ref, onValue, off } from "firebase/database";
import { memo } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const StdEdit = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          {employee ? (
            <div className="bottom">
              <div className="left">
                <img
                  src={
                    file
                      ? URL.createObjectURL(employee.downloadUrl)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <form onSubmit={handleSubmit}>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="formInput">
                    <label>Name</label>
                    <input
                      type="text"
                      value={employee.name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="john-doe"
                    />
                    {name.length > 5 && !/^[a-zA-Z\s]+$/.test(employee.name) && (
                      <span className="text-danger">
                        Enter a name without numbers and special characters
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>Email</label>
                    <input
                      type="text"
                      value={employee.email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john-doe"
                    />
                    {email.length > 0 && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) && (
                      <span className="text-danger">
                        Enter a valid email address
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>Password</label>
                    <input
                      type="password"
                      value={employee.password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="*****"
                    />
                    {!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password) && password.length > 0 && (
                      <span className="text-danger">
                        Password must contain at least one uppercase, one lowercase, one number, and one special character and must be at least 8 characters long
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={employee.confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="*****"
                    />
                    {password !== confirmpassword && password.length > 0 && (
                      <span className="text-danger">Password do not match</span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>Phone</label>
                    <input
                      type="number"
                      value={employee.phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="1234567"
                    />
                    {phone.length > 0 && !/^\d{7,}$/.test(employee.phone) && (
                      <span className="text-danger">
                        Enter a valid Phone Number
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>Role</label>
                    <select
                      className="drop"
                      value={employee.role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <div className="formInput">
                    <label>Department</label>
                    <select
                      className="drop"
                      value={employee.department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="science">Science</option>
                      <option value="computer">Computer</option>
                      <option value="arts">Arts</option>
                    </select>
                  </div>
                  {/* disabled={per !== null && per < 100} */}
                  <button  type="submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(StdEdit);
