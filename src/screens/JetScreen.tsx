import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Menu } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loadCity } from '../actions/CityActions';
import { City } from '../Enums';

function JetScreen(props: any) {
  const dispatch = useDispatch();
  
  function goToCity(place: City) {
    dispatch(loadCity(place));
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

export default JetScreen;
