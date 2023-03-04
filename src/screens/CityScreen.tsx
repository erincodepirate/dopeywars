import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TextInput, Button, Dialog, Portal, Provider, Text, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Drug, EventTypes } from '../Enums';
import { RootState, DrugForSale } from '../Interfaces';
import { buyDrug, decrementDay, freeDrug, sellDrug } from '../actions/DopeActions';
import { visit } from '../actions/CityActions';

function CityScreen(props: any) {
  const { navigation } = props;

  const { cityState, dopeState } = useSelector((state: RootState) => state);
  const drugs: DrugForSale[] = cityState.drugsForSale;

  const dispatch = useDispatch();

  const [eventVisible, setEventVisible] = React.useState(false);
  const [eventMessage, setEventMessage] = React.useState("");
  const [eventIndex, setEventIndex] = React.useState(0);
  const [buyVisible, setBuyVisible] = React.useState(false);
  const [sellVisible, setSellVisible] = React.useState(false);
  const [amountToBuy, setAmountToBuy] = React.useState(0);
  const [amountToSell, setAmountToSell] = React.useState(0);
  const [activeDrug, setActiveDrug] = React.useState({ drug: Drug.Acid, price: 0 });

  const sellDialog = () =>
    setSellVisible(true);

  const closeSellDialog = () =>
    setSellVisible(false);

  const buyDialog = () =>
    setBuyVisible(true);

  const closeBuyDialog = () =>
    setBuyVisible(false);

  const eventDialog = () =>
    setEventVisible(true);

  const handleNextEvent = () => {
    if (eventIndex < cityState.events.length) {
      if (cityState.events[eventIndex].event == EventTypes.drugFree) {
        dispatch(freeDrug(cityState.events[eventIndex].drug))
      }
      setEventMessage(cityState.events[eventIndex].message);
      setEventVisible(true);
      setEventIndex(eventIndex + 1);
    }
  }

  const closeEventDialog = () => {
    setEventVisible(false);
    handleNextEvent()
  }

  useEffect(() => {
    if (!cityState.hasVisited) {
      dispatch(decrementDay());
      dispatch(visit());
      if (eventIndex < cityState.events.length) {
        handleNextEvent();
      }
    }
  }, []);


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
          <FlatList data={drugs} renderItem={({ item }) => {
            return (
              <View style={styles.row}>
                <TouchableRipple style={styles.cell} onPress={() => {
                  setActiveDrug(item);
                  sellDialog();
                }}>
                  <Text style={styles.cellText}>{
                    dopeState.drugs ? dopeState.drugs[item.drug] : 0
                  }</Text>
                </TouchableRipple>
                <TouchableRipple style={styles.cell}>
                  <Text style={styles.cellText}>{item.drug}</Text>
                </TouchableRipple>
                <TouchableRipple style={styles.cell} onPress={() => {
                  setActiveDrug(item);
                  buyDialog();
                }}>
                  <Text style={styles.cellText}>{item.price ? ("$" + item.price) : "None"}</Text>
                </TouchableRipple>
              </View>)
          }} keyExtractor={(drug: DrugForSale) => drug.drug} />

        </View>
        <View style={styles.status}>
          <Text>
            Cash on Hand: {dopeState.cash} |
            Health: {dopeState.health} |
            Bank: {dopeState.bank} |
            Loan: {dopeState.loan} |
            Days: {dopeState.days}
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              navigation.navigate('Jet');
            }}
            mode="contained"
            icon="car-side">
            Leave
          </Button>
        </View>


        <Portal>
          <Dialog
            visible={buyVisible}
            onDismiss={closeBuyDialog}>
            <Dialog.Title>Buy {activeDrug.drug}</Dialog.Title>
            <Dialog.Content>
              {activeDrug.price != 0 ?
                (<View>
                  <Text variant="bodyMedium">How much {activeDrug.drug} do you want to buy?</Text>
                  <TextInput onChangeText={(value) => setAmountToBuy(Number(value))} />
                </View>)
                :
                (<Text variant="bodyMedium">No one is selling {activeDrug.drug} here.</Text>)
              }
            </Dialog.Content>
            <Dialog.Actions>
              {activeDrug.price != 0 &&
                <Button onPress={() => {
                  dispatch(buyDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: amountToBuy }));
                  closeBuyDialog();
                }}>Buy</Button>
              }
              <Button onPress={closeBuyDialog}>{activeDrug.price != 0 ? "Cancel" : "Close"}</Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog
            visible={sellVisible}
            onDismiss={closeSellDialog}>
            <Dialog.Title>Sell {activeDrug.drug}</Dialog.Title>
            <Dialog.Content>
              {activeDrug.price != 0 ?
                (<Text variant="bodyMedium">How much {activeDrug.drug} do you want to sell?</Text>)
                :
                (<Text variant="bodyMedium">No one is interested in buying {activeDrug.drug} here. You may dump some of your suppy.</Text>)
              }
              <TextInput onChangeText={(value) => setAmountToSell(Number(value))} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                dispatch(sellDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: amountToSell }));
                closeSellDialog();
              }}>{(activeDrug.price != 0 ? "Sell" : "Dump")}</Button>
              <Button onPress={closeSellDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog
            visible={eventVisible}
            onDismiss={closeEventDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">{eventMessage}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={closeEventDialog}>Ok</Button>
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
    width: '100%',
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
  },
  buttons: {
    flexDirection: 'row'
  },
  status: {
    flexDirection: 'row'
  }
});

export default CityScreen;
