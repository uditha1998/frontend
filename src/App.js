import Routes from "./Routes";
import { Footer, Navbar } from "./components";
import "./App.css";

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

SuperTokens.init({
  appInfo: {
    appName: "Sri Lanka Explore",
    apiDomain: process.env.REACT_APP_NODE_API_URL,
    websiteDomain: process.env.REACT_APP_HOSTING_URL,
    apiBasePath: "/api",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init({
      style: {
        button: {
          backgroundColor: "#ff5a1f",
        },
        row: {
          marginTop: "100px",
        },
        container: {
          marginBottom: "100px",
        },
      },
    }),
    Session.init(),
  ],
});

function App() {
  return (
    <div className="App">
      <SuperTokensWrapper>
        <Navbar />
        <Routes />
        <Footer />
      </SuperTokensWrapper>

      <ToastContainer />
    </div>
  );
}

export default App;
