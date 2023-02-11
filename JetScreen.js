import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

const places = ["Bronx", "Ghetto", "Central Park", "Manhattan", "Coney Island", "Brooklyn"]

class JetScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Where to?</Text>
        <DataTable>
          {
            places.map(place => (
              <DataTable.Row key={place} onPress={
                () => {
                  this.goToCity(place)}
                }>
              <DataTable.Cell>
                  <Text>
                    {place}
                  </Text>
              </DataTable.Cell>
            </DataTable.Row>
            ))
          }
        </DataTable>

        <Button
          title="Play"
          onPress={() =>
            this.props.navigation.navigate('Jet')
          }
        />
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
});

export default JetScreen;