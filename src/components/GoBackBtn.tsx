import { useNavigate } from "react-router-dom";
import arrow from "../img/svg/arrow.svg";

const GoBackBtn = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This goes back to the previous page in the history stack
  };

  return (
    <button className="GoBackBtn" onClick={handleGoBack}>
      <img src={arrow} alt="arrow" />
    </button>
  );
};

export default GoBackBtn;
