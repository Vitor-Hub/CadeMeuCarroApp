import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, TextButton } from "./styles";

type Props = TouchableOpacityProps & {
  title?: string;
  color?: string;
};

const Button = ({ title, color, ...rest }: Props) => {
  return (
    <Container style={color ? { backgroundColor: color } : {}} {...rest}>
      <TextButton>{title}</TextButton>
    </Container>
  );
};

export default Button;
