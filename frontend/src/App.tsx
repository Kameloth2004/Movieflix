import { AuthContext, AuthContextData } from "./AuthContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Routes from "./Routes";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";



const App = () => {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
  <AuthContext.Provider value={{authContextData, setAuthContextData}}>
    <Routes />
    <ToastContainer />
  </AuthContext.Provider>
  );

}

export default App;
