import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
  `}
  font-size: 42px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 280px;
`;
