import styled, {css} from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  background-color: #845ec2;
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    color: ${theme.COLORS.WHITE};
  `}
  font-size: 42px;
  align-self: flex-start;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  width: 100%;
  padding: 0 32px;
`;
