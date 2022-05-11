import { createContext } from "react";

const ViewContext = createContext<"Home" | "Signin">("Signin");
export default ViewContext;
