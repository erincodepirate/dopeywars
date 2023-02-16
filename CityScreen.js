import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, DataTable, Dialog, Portal, Provider, Text } from 'react-native-paper';

const drugs = [
  {name:"Acid", price:1000}, 
  {name:"Cocaine", price: 10000},
  {name:"Ecstacy", price: 30},
  {name:"PCP", price: 1500},
  {name:"Heroin", price: 5000},
  {name:"Weed", price: 400},
  {name:"Shrooms", price: 800},
  {name:"Speed", price: 100}]

// will be replaced with redux later
const remaining = 30;
const cash = 2000;
const debt = 3000;
const savings = 0;
const coat_capacity = 100;
const coat = [{name: "Acid", qty:10}];


let activeDrug = '';

function getCoatQty(drug) {
  let d = coat.filter(x => x.name === drug);
  return (d.length > 0 ? d[0].qty : 0);
}

function CityScreen({navigation}) {
  //render() {
    //const [buyVisible, setBuyVisible] = React.useState(false);
    const [sellVisible, setSellVisible] = React.useState(false);

    const sellDialog = () =>
      setSellVisible(true);

    const closeSellDialog = () => 
      setSellVisible(false);

    return (
      <Provider>
      <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>On Hand</DataTable.Title>
            <DataTable.Title>Drug</DataTable.Title>
            <DataTable.Title>Price</DataTable.Title>
          </DataTable.Header>
          {
            drugs.map(drug => ( 
              <DataTable.Row key={drug.name}>
                <DataTable.Cell>
                  {getCoatQty(drug.name)}
                </DataTable.Cell>
                <DataTable.Cell>
                  {drug.name}
                </DataTable.Cell>
                <DataTable.Cell>
                  {drug.price}
                </DataTable.Cell>
              </DataTable.Row>
            ))
          }
        </DataTable>
        <Button
          onPress={sellDialog}
          mode="contained"
          icon="car-side"
          >
          Sell
        </Button>
        <Button
          onPress={() =>
            navigation.navigate('Jet')
          }
          mode="contained"
          icon="car-side"
          >
          Jet
        </Button>
        <Portal>
          <Dialog 
            visible={sellVisible} 
            onDismiss={closeSellDialog}>
            <Dialog.Title>Sell {activeDrug}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">How much {activeDrug} do you want to sell?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={closeSellDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      </Provider>
    );
  //}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CityScreen;