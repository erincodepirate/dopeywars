import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { CityAction, firstLoad } from '../actions/CityActions';

function IntroScreen(props: any) {
  console.log(props);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>DopeyWars</Text>
      <Text>{"\n"}by Erin Clark{"\n\n"}</Text>
      <Button
        onPress={() => {
          props.firstLoad();
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

const mapDispatchToProps = (dispatch: Dispatch<CityAction>) => (
  bindActionCreators({
    firstLoad
  }, dispatch)
)

export default connect(null, mapDispatchToProps)(IntroScreen);
