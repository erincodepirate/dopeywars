import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class IntroScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DopeyWars by Erin Clark</Text>

        <Button
          title="Play"
          onPress={() =>
            this.props.navigation.navigate('Jet')
          }
        />
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
});

export default IntroScreen;