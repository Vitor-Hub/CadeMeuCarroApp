import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  width: 60%;
  height: 56px;
  font-size: 14px;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.PRIMARY};
    color: ${theme.TEXT.PRIMARY};
  `}
`;

export const TextButton = styled.Text`
  ${({ theme }) => css`
    font-size: 18px;
    color: ${theme.COLORS.WHITE};
  `}
`;
