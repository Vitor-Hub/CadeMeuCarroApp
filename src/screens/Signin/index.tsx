import React from "react";
import { Image, ImageBackground } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container, Content, Form, Logo } from "./styles";

const backgroundImage = require("../../assets/signinBackground.jpeg");
const logo = require("../../assets/logo.png");

function SignIn() {
  return (
    <Container>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ width: "100%", flex: 1, justifyContent: "center" }}
      >
        <Content>
          <Logo source={logo} />
          <Form>
            <Input
              placeholder="username"
              type="primary"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              placeholder="password"
              type="primary"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Button onPress={() => console.log("pressed")} title="Entrar" />
          </Form>
        </Content>
      </ImageBackground>
    </Container>
  );
}

export default SignIn;
