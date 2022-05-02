import { DrawerItem } from "@react-navigation/drawer";
import styled from "styled-components/native";

export const DrawerView = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TextContent = styled.Text`
  font-size: 18px;
`;

export const ProfileInfos = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const DrawerItems = styled.View`
  width: 100%;
  flex-grow: 6;
`;

export const SignOutIcon = styled(DrawerItem)`
  width: 100%;
  margin-bottom: 10px;
`;
