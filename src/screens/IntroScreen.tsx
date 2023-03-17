import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

function IntroScreen(props: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>DopeyWars</Text>
      <Text>{"\n"}by Erin Clark{"\n\n"}</Text>
      <Image
        style={styles.raccoon}
        source={require("../../images/raccdealer.png")}
      />
      <Text style={styles.credits}>Inspired by DopeWars for Palm</Text>
      <Text style={styles.credits}>by Matthew Lee and Michael Hallet</Text>
      <Text style={styles.credits}>As well as the original Drug Wars by John E. Dell</Text>
      <Text>{"\n\n"}</Text>
      <Button
        onPress={() => {
          props.navigation.navigate('Jet');
        }
        }
        mode="contained"
        icon="gamepad-variant"
      >
        Play
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32
  },
  raccoon: {
    height: 128,
    width: 128,
  },
  credits: {
    textAlign: 'center'
  }
});

export default IntroScreen;
