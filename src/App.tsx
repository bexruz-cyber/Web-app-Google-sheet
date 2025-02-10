import { useEffect, useState } from "react";
import Navigation from "./Router/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate()
  const [islogedIn, setIslogedIn] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIslogedIn(true)
    }
    else {
      setIslogedIn(false)
    }
  }, [])

  useEffect(() => {
    if (!islogedIn) {
      navigate("/add_worker")
    }else{
      navigate("/")
    }
  }, [islogedIn])
  

  return (
    <div>
      <Navigation />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
