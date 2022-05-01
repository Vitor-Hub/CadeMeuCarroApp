import styled, { css } from "styled-components/native";
import Button from "../../components/Button";

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const ButtonContent = styled.View`
  position: absolute;
  bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
