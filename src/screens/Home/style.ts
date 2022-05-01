import styled, { css } from "styled-components/native";
import Button from "../../components/Button";

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const ParkButton = styled(Button)`
  position: absolute;
  bottom: 50px;
`;
