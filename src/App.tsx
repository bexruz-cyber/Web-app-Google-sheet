import Navigation from "./Router/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  
  

  return (
    <div>
      <Navigation />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
