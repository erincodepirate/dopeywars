import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Menu, Text, ThemeProvider, TouchableRipple, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { City } from '../Enums';
import { RootState } from '../Interfaces';

function JetScreen(props: any) {
  const theme = useTheme();
  //const { cityState } = useSelector((state: RootState) => state);
  const currentCity = useSelector((state: RootState) => state.cityState.currentCity)

  function goToCity(place: City) {
    props.navigation.navigate('City', { place: place });
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuItem}>
        <Divider />
      </View>
      {
        Object.values(City).map(place => (
          <View key={place} style={styles.menuItem}>
            <TouchableRipple onPress={() => { goToCity(place) }}>
              <Text style={styles.place}>{place}</Text>
            </TouchableRipple>
            <Divider />
          </View>
        ))
      }
      <View style={styles.cityStatus}>
        {
          currentCity &&
          <Card>
            <Card.Content>
              <Text>
                Current location: {currentCity}
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
    paddingTop: 10
  }
});

export default JetScreen;
