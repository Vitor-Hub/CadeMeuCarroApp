import {TextInput} from 'react-native';
import styled, {css} from 'styled-components/native';

export type TypeProps = 'primary' | 'secondary';

type Props = {
  type: TypeProps;
};

export const Container = styled(TextInput).attrs<Props>(({theme, type}) => ({
  placeholderTextColor:
    type === 'primary' ? theme.COLORS.PRIMARY : theme.COLORS.PRIMARY,
}))<Props>`
  width: 60%;
  height: 56px;
  font-size: 14px;
  border-radius: 12px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 16px;

  ${({theme}) => css`
    background-color: ${theme.COLORS.WHITE};
  `}
`;
