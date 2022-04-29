import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container, Title } from "./styles";

function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Container>
          <Title>Cadê Meu Carro</Title>
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
        </Container>
      </KeyboardAvoidingView>
    </Container>
  );
}

export default SignIn;
