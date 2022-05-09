import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, TextButton } from "./styles";

type Props = TouchableOpacityProps & {
  title?: string;
};

const Button = ({ title, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <TextButton>{title}</TextButton>
    </Container>
  );
};

export default Button;
