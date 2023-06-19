import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomeView from './pages/dashboard/DashBoard.jsx';
import StdListing from './pages/student/StdListing'
import StdEdit from './pages/student/StdEdit';
import StdView from './pages/student/StdView';
import Login from './pages/authentication/Login';
import StdCreate from './pages/student/StdCreate'
import About from './pages/about/About';
import Home from './pages/home/HomeView.jsx';
import { DarkModeContext } from './Context/DarkModeContext.js';
import { AuthContext } from './Context/AuthContext.js';
import { useContext } from 'react';
import "./color/style.scss"
import Profile from './pages/profile/Profile.jsx';
import Computer from './pages/departments/Computer.jsx';
import Science from './pages/departments/Science.jsx';
import Arts from './pages/departments/Arts.jsx';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  }
  const RequireAuthForLogin = ({ children }) => {
    return !currentUser ? children : <Navigate to="/" />;
  }
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<RequireAuth><HomeView /></RequireAuth>} />
            <Route path='login' element={<RequireAuthForLogin><Login /></RequireAuthForLogin>} />
            <Route path='about' element={<About />} />
            <Route path='home' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='computer' element={<Computer />} />
            <Route path='science' element={<Science />} />
            <Route path='arts' element={<Arts />} />
            <Route path='student'>
              <Route index element={<RequireAuth><StdListing /></RequireAuth>} />
              <Route path='edit/:id' element={<StdEdit />} />
              <Route path='view/:id' element={<StdView />} />
              <Route path='create' element={<StdCreate />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
