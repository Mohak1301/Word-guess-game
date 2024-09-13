import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Pages/Spinner";

const PrivateRoute = () => {
  const [ok, setok] = useState(false);

let token = null;


if(localStorage.getItem("token")){
    token=localStorage.getItem("token")
    console.log(token)
}

  useEffect(() => {
    // Fetch user data and scores
    async function authCheck() {
      const response = await axios.get(
        `/api/v1/auth/userauth`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.ok) {
        setok(true);
      } else {
        setok(false)
      }
    }
    if(token){
 authCheck()
    }
  }, [token]);

  return ok?<Outlet/>:<Spinner/>;
};

export default PrivateRoute;
