import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

class IntroScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>DopeyWars</Text>
        <Text>{"\n"}by Erin Clark{"\n\n"}</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('Jet')
          }
          mode="contained"
          icon="gamepad-variant"
          >
          Play
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20
  },
});

export default IntroScreen;