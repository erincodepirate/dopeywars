import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadCity } from '../actions/CityActions';
import { City } from '../Enums';
import { RootState } from '../Interfaces';

function JetScreen(props: any) {
  const dispatch = useDispatch();
  const { cityState } = useSelector((state: RootState) => state);
  
  function goToCity(place: City) {
    // only load the new city if we are moving to a different city
    if (cityState.currentCity != place)
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
      {
        cityState.currentCity &&
        <Text>
          Current location: {cityState.currentCity}
        </Text>
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
