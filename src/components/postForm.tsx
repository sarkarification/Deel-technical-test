import React from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../util/postCodeUtil";
import { ErrorMessage } from "../lib/types";
import useDebounce from "../hooks/useDebounce";

export interface PostFormInput {
  showError: ErrorMessage;
  setShowError: React.Dispatch<React.SetStateAction<ErrorMessage>>;
}

const PostForm = (props: PostFormInput) => {
  const navigate = useNavigate();
  const [autoFillData, setAutoFillData] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [validateError, setValidateError] = React.useState<boolean>(false);
  const debouncedValue = useDebounce(inputValue, 1000)
  
  React.useEffect(()=>{
    if(debouncedValue.length === 0){
      setAutoFillData([]);
    } else if(debouncedValue.length > 0) {
      API.autoFillPostCodes(debouncedValue)
        .then((response) => {
          setAutoFillData(response.result);
          setValidateError(false);
        })
        .catch((e) => {
          setValidateError(true);
          props.setShowError({
            ...props.showError,
            error: true,
            message: e.message,
          });
        });
    }
  }, [debouncedValue])

  const getHighlightedText = (text: string, highlight: string): JSX.Element => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    if (value.length <= 0) {
      setValidateError(true);
    } else {
      try {
        const data = await API.validatePostCodes(value);
        if (!data.result) {
          setValidateError(true);
          setAutoFillData([]);
        } else {
          setValidateError(false);
          setAutoFillData([]);
          navigate(`/${value}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form className="searchContainer" onSubmit={handleSubmit}>
      <div className="inputContainer">
        <input
          className="inputbox"
          type="text"
          id="postcode"
          aria-describedby="postCodeExample"
          placeholder={"Type postcode here"}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (e.target.value === "") {
              setValidateError(false);
            }
          }}
        />
        <div
          className="clear"
          onClick={() => {
            setInputValue("");
            setAutoFillData([])
            setValidateError(false);
          }}
        >
          <span>X</span>
        </div>
      </div>
      {autoFillData && autoFillData.length !== 0 && (
        <div
          className="autoFill"
          data-testid="autoFill"
          style={{
            opacity: `${autoFillData && autoFillData.length !== 0 ? "1" : "0"}`,
          }}
        >
          {autoFillData.slice(0, 15).map((value, index) => {
            return (
              <Link key={index} to={`/${value}`}>
                {getHighlightedText(value, inputValue)}
              </Link>
            );
          })}
        </div>
      )}

      {validateError && (
        <p className="text-danger mt-2 pt-2">
          Invalid Input Provided! Please Select from Dropdown
        </p>
      )}

      {
        <button
          type="submit"
          className="submitBtn"
          style={{
            display: `${
              autoFillData && autoFillData.length !== 0 ? "none" : "block"
            }`,
          }}
        >
          SEARCH
        </button>
      }
    </form>
  );
};

export default PostForm;
