import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

function IntroScreen(props: any) {
  console.log(props);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>DopeyWars</Text>
      <Text>{"\n"}by Erin Clark{"\n\n"}</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20
  },
});

export default IntroScreen;
