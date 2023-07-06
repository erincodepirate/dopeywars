import React from 'react';
import { Appbar, Divider, IconButton, Menu, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CustomNavigationBar(props: any) {
  const { options, navigation, route, back, showAboutDialog } = props;
  const title = getHeaderTitle(options, route.name);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const theme = useTheme();


  const styles = StyleSheet.create({
    titleImage: {
      width: 48,
      height: 48
    },
    titleText: {
      fontSize: 32,
      color: theme.colors.onPrimary
    },
    header: {
      backgroundColor: theme.colors.primary,
    }
  });

  return (
    <Appbar.Header style={styles.header}>
      <Image
        style={styles.titleImage}
        source={require("../../images/raccicon.png")}
      />
      <Appbar.Content title={options.headerTitle ? options.headerTitle() : title} />
      <Menu
        anchor={
          <TouchableOpacity
            onPress={openMenu}><IconButton icon="menu" iconColor={theme.colors.onPrimary}></IconButton>
          </TouchableOpacity>
        }
        visible={visible}
        onDismiss={closeMenu}>
        <Menu.Item
          onPress={() => {
            props.navigation.navigate('Gameover');
            closeMenu();
          }}
          title="End Game" />
        <Divider />
        <Menu.Item
          onPress={() => {
            showAboutDialog();
            closeMenu();
          }}
          title="About DopeyWars" />
      </Menu>
    </Appbar.Header>
  );
}