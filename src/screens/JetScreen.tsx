import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Menu } from 'react-native-paper';

const places = ["Bronx", "Ghetto", "Central Park", "Manhattan", "Coney Island", "Brooklyn"]

function JetScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
  function goToCity(place: String) {
    console.log(place);
    props.navigation.navigate('City');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Where to?</Text>
        {
          places.map(place => (
            <Menu.Item
              key={place} 
              onPress={
              () => {
                goToCity(place)}
              }
              title={place}/>
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