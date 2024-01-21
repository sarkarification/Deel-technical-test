import React from "react";
import PostForm from "../components/postForm";
import ErrorHandler from "../components/error";
import { ErrorMessage } from "../lib/types";

import "./Home.css";

const Home = () => {
  const [showError, setShowError] = React.useState<ErrorMessage>({
    error: false,
    message: "Error",
  });

  return (
    <div className="container home">
      {!showError.error && (
        <PostForm showError={showError} setShowError={setShowError} />
      )}
      {showError.error && (
        <ErrorHandler showError={showError} setShowError={setShowError} />
      )}
    </div>
  );
};

export default Home;
