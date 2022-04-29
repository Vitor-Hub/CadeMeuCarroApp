import {Button} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled(Button)`
  width: 360px;
  height: 56px;
  font-size: 14px;
  border-radius: 12px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 16px;

  ${({theme}) => css`
    background-color: ${theme.COLORS.TERTIARY};
    color: ${theme.TEXT.PRIMARY};
  `}
`;
