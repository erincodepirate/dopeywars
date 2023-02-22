import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Dialog, Portal, Provider, Text, TouchableRipple } from 'react-native-paper';

interface Drug {
  name: string;
  price: number;
} 

const drugs: Drug[] = [
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

function getCoatQty(drug: String) {
  let d = coat.filter(x => x.name === drug);
  return (d.length > 0 ? d[0].qty : 0);
}

function CityScreen(props: { navigation: any; }) {
    const { navigation } = props;
    
    const [buyVisible, setBuyVisible] = React.useState(false);
    const [sellVisible, setSellVisible] = React.useState(false);

    const sellDialog = () =>
      setSellVisible(true);

    const closeSellDialog = () => 
      setSellVisible(false);

    const buyDialog = () =>
      setBuyVisible(true);

    const closeBuyDialog = () => 
      setBuyVisible(false);

    return (
      <Provider>
      <View style={styles.container}>
        <View style={styles.table}>
            <View style={styles.header}>
              <View style={styles.cell}>
                <Text>
                  On Hand
                </Text>
              </View>
              <View style={styles.cell}>
                <Text>
                  Drug
                </Text>
              </View>
              <View style={styles.cell}>
                <Text>
                  Price
                </Text>
              </View>
            </View>
            <FlatList data={drugs} renderItem={({item})=>{
              return (
              <View style={styles.row}>
                <TouchableRipple style={styles.cell} onPress={()=>{
                  activeDrug = item.name;
                  sellDialog();
                }}>
                  <Text style={styles.cellText}>{getCoatQty(item.name)}</Text>
                </TouchableRipple>
                <TouchableRipple style={styles.cell}>
                  <Text style={styles.cellText}>{item.name}</Text>
                </TouchableRipple>
                <TouchableRipple style={styles.cell} onPress={()=>{
                  activeDrug = item.name;
                  buyDialog();
                }}>
                  <Text style={styles.cellText}>${item.price}</Text>
                </TouchableRipple>
              </View>)
            }} keyExtractor={(drug: Drug) => drug.name} />

        </View>
        <Button
          onPress={() =>
            navigation.navigate('Jet')
          }
          mode="contained"
          icon="car-side">
          Leave
        </Button>

        <Portal>
          <Dialog 
            visible={buyVisible} 
            onDismiss={closeBuyDialog}>
            <Dialog.Title>Buy {activeDrug}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">How much {activeDrug} do you want to buy?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={closeBuyDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  table: {
    flex: 1,
    justifyContent: 'center',
    width:'100%',
  },
  row: {
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellText: {
  }
});

export default CityScreen;