import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { DataTable, Divider, Menu } from 'react-native-paper';

const places = ["Bronx", "Ghetto", "Central Park", "Manhattan", "Coney Island", "Brooklyn"]

class JetScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Where to?</Text>
          {
            places.map(place => (
              <Menu.Item
                key={place} 
                onPress={
                () => {
                  this.goToCity(place)}
                }
                title={place}/>
            ))
          }
      </View>
    );
  }

  goToCity(place) {
    console.log(place);
    this.props.navigation.navigate('City');
  }
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