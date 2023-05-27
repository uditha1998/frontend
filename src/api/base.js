import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";

const axiosclient = axios.create({
  baseURL:"http://localhost:5000",
});

Session.addAxiosInterceptors(axiosclient);

export { axiosclient };
