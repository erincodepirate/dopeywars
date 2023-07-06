import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import AboutContent from '../components/AboutContent';

function IntroScreen(props: any) {
  return (
    <View style={styles.container}>
      <AboutContent/>
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
  },
  author: {
    paddingTop: 10,
    paddingBottom: 20
  },
  creditsView: {
    paddingTop: 20,
    paddingBottom: 20
  }
});

export default IntroScreen;
