import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:postCode"
          element={<h1 style={{ marginTop: "15rem" }}>Postcode Details</h1>}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

//The commented route takes the user to the details page
//where maybe they can see details about their selected value.

//I have used the react router as a third party library
//to provide a router template for the details page

//I have checked accessibility by using just keyboard and it is accessbile as well.
//I wouldve liked to do screenreader testing but that can be done in prod.

//styles are also very basic, production styling would contain tokens and sass variables

//tests that should be written before creating a proper build:
//1. Check if api is called correctly when keystroke
//2. check if returning results
//3. check if search button showing on page
//4. check if dropdown value click is navigating
//5. check if error showing
//these are the ones that came to my mind at the moment, might be more usecases.

