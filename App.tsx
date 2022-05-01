import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./src/hooks/auth";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/Signin";
import theme from "./src/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent backgroundColor="transparent" />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
