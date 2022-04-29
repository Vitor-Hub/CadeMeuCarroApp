import React from 'react';
import {ButtonProps} from 'react-native';
import {Container} from './styles';

const Button = ({...rest}: ButtonProps) => {
  return <Container {...rest} />;
};

export default Button;
