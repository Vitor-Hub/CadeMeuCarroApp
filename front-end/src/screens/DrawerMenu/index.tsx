import { DrawerItem } from "@react-navigation/drawer";
import React from "react";
import {
  DrawerItems,
  DrawerView,
  ProfileInfos,
  SignOutIcon,
  TextContent,
} from "./styles";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../../theme";
import { Image } from "react-native";

const perfilImage = require("../../assets/perfilImage.png");
const exitIcon = require("../../assets/exitIcon.png");

function DrawerMenu(props: any) {
  return (
    <DrawerView {...props}>
      <ProfileInfos>
        <Avatar.Image
          source={perfilImage}
          size={50}
          style={{
            marginTop: 25,
            marginBottom: 25,
            backgroundColor: theme.COLORS.PRIMARY,
          }}
        />
        <TextContent>Vitor Santos Pereira</TextContent>
        <TextContent>rj.vitorsantos@gmail.com</TextContent>
      </ProfileInfos>
      <DrawerItems>
        <DrawerItem label="Histórico" onPress={() => console.log("help")} />
        <DrawerItem
          label="Configuração"
          onPress={() => console.log("config")}
        />
      </DrawerItems>
      <SignOutIcon
        label="Sign Out"
        style={{}}
        icon={() => (
          <Image
            source={exitIcon}
            resizeMode="cover"
            style={{ width: 20, height: 20 }}
          />
        )}
        onPress={() => console.log("out")}
      />
    </DrawerView>
  );
}

export default DrawerMenu;
