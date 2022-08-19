import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import "./App.css";
import { AuthContext, AuthContextData } from "./AuthContext";
import Routes from "./Routes";

const App = () => {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
  <AuthContext.Provider value={{authContextData, setAuthContextData}}>
    <Routes />
  </AuthContext.Provider>
  );

}

export default App;
