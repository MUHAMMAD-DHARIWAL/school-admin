import "./stdcreate.scss";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { auth, storage } from "../../firebase";
import firebaseDB from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [file, setFile] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [per, setPerc] = useState(null);

  const nameRegex = /^[a-zA-Z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{11}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      if (!file) return;

      const name = new Date().getTime() + file.name;
      console.log(name);

      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setDownloadUrl(downloadURL);
          });
        }
      );
    };

    uploadFile();
  }, [file]);

  const resetFormFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setConfirmPassword("");
    setRole("");
    setDepartment("");
    setFile("");
    setDownloadUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameRegex.test(name)) {
      alert("Please Enter a name without number and speacial characters");
      return;
    }
     if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10 digit phone number");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least one uppercase, one lowercase, one number, and one special character and must be at least 8 characters long");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // User created successfully
    const user = userCredential.user;
    const uid = user.uid;

    const empData = {
      name,
      email,
      phone,
      role,
      department,
      downloadUrl,
    };

    // Get a reference to the employees node in the database
    const usersRef = firebaseDB.ref("users");

    // Set the employee data using the user's ID as the key
    usersRef.child(uid)
      .set(empData)
      .then(() => {
        alert("User created successfully.");
        resetFormFields();
        navigate("/"); // Redirect to the desired page
      })
      .catch((error) => {
        console.log("Error creating user:", error);
        alert("An error occurred while creating the user. Please try again.");
      });
  })
  .catch((error) => {
    console.log("Error creating user:", error);
    alert("An error occurred while creating the user. Please try again.");
  });

  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                </div>
                <div className="formInput">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="john-doe" /> 
                {name.length > 5 && !nameRegex.test(name) && (
                <span className="text-danger">
                 Enter a name without numbers and special characters             
                </span>
                )}
                </div>
                <div className="formInput">
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john-doe" /> 
                {email.length > 0 && !emailRegex.test(email) && (
                  <span className="text-danger">
                    Enter a valid email address
                  </span>
                )}
                </div>
                <div className="formInput">
                <label>Password</label>
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*****" /> 
                  {!passwordRegex.test(password) && password.length > 0 && (
                    <span className="text-danger">Password must contain at least one uppercase, one lowercase, one number, and one special character and must be at least 8 characters long</span>
                  )}
                </div>
                <div className="formInput">
                <label>Confirm Password</label>
               <input type="password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="*****" /> 
                {password!== confirmpassword && password.length > 0 && (
            <span className="text-danger">Password do not match</span>
             )} 
                </div>
                <div className="formInput">
                <label>Phone</label>
               <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="1234567" /> 
                {phone.length > 0 && !phoneRegex.test(phone) && (
                  <span className="text-danger">
                    Enter a valid Phone Number
                  </span>
                )} 
                </div>
              <div className="formInput">
                <label>Role</label>
                <select className="drop" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                </select>
              </div>
              <div className="formInput">
                <label>Department</label>
                <select className="drop" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="">Select</option>
                        <option value="science">Science</option>
                        <option value="computer">Computer</option>
                        <option value="arts">Arts</option>
                </select>
              </div>
                <button disabled={per !== null && per < 100} type="submit">
                Send
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;