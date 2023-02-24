import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Menu } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { CityAction, loadCity } from '../actions/CityActions';
import { City } from '../Enums';

function JetScreen(props: any) {
  function goToCity(place: City) {
    props.loadCity(place)
    props.navigation.navigate('City');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Where to?</Text>
      {
        Object.values(City).map(place => (
          <Menu.Item
            key={place}
            onPress={
              () => {
                goToCity(place)
              }
            }
            title={place} />
        ))
      }
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
  citytext: {

    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  }
});

const mapDispatchToProps = (dispatch: Dispatch<CityAction>) => (
  bindActionCreators({
    loadCity
  }, dispatch)
)

export default connect(null, mapDispatchToProps)(JetScreen);
