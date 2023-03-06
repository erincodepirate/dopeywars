import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Menu, Text, TouchableRipple } from 'react-native-paper';
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
      <View style={styles.menuItem}>
        <Divider/>
      </View>
      {
        Object.values(City).map(place => (
          <View style={styles.menuItem}>
            <TouchableRipple onPress={() => { goToCity(place) }}>
              <Text style={styles.place}>{place}</Text>
            </TouchableRipple>
            <Divider />
          </View>
        ))
      }
      <View style={styles.cityStatus}>
      {
        cityState.currentCity &&
        <Card>
          <Card.Content>
            <Text>
              Current location: {cityState.currentCity}
            </Text>
          </Card.Content>
        </Card>
      }
      </View>
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
  place: {
    fontSize: 28,
    textAlign: 'center'
  },
  menuItem: {
    justifyContent: 'center',
    width: "100%",
  },
  citytext: {
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  cityStatus: {
    paddingTop: '10px'
  }
});

export default JetScreen;
