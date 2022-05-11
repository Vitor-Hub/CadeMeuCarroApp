import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { postUser } from "../../services/users";
import { Container, Content, Form, Logo } from "./styles";

const backgroundImage = require("../../assets/signinBackground.jpeg");
const logo = require("../../assets/logo.png");

interface IUserInfo {
  email: string;
  password: string;
}

interface ISignIn {
  setView: Function;
}

function SignIn(props: ISignIn) {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async () => {
    await postUser(userInfo)
      .then((response) => {
        console.log(response);
        props.setView("Home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
            />
            <Input
              placeholder="password"
              type="primary"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, password: text })
              }
            />
            <Button onPress={() => handleLoginSubmit()} title="Entrar" />
          </Form>
        </Content>
      </ImageBackground>
    </Container>
  );
}

export default SignIn;
