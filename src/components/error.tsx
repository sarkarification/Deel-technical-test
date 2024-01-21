import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../lib/types";

export interface Errorhandler {
  showError: ErrorMessage;
  setShowError: React.Dispatch<React.SetStateAction<ErrorMessage>>;
}

const ErrorHandler = (props: Errorhandler) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "10rem" }}>
      <h3>Postcode not found!</h3>
      <p>{props.showError.message}</p>
      <button
        onClick={() => {
          props.setShowError({ ...props.showError, error: false });
          navigate(`/`);
        }}
      >
        Retry?
      </button>
    </div>
  );
};

export default ErrorHandler;
