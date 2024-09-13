import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import GuessMyNumber from './Pages/Game';
import PrivateRoute from './Components/Routes/PrivateRoute';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer

function App() {
  return (
   <>
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<PrivateRoute/>} >
        <Route path="profile" element={<Profile />} />
        <Route path="game" element={<GuessMyNumber />} />
        </Route>
      
      </Routes>
      </>
    
  );
}

export default App;
