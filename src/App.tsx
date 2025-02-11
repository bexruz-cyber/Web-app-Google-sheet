import Navigation from "./Router/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (
    <>
      <Navigation />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
