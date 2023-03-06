import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TextInput, Button, Dialog, Portal, Provider, Text, TouchableRipple, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Drug, EventTypes } from '../Enums';
import { RootState, DrugForSale } from '../Interfaces';
import { buyDrug, decrementDay, freeDrug, sellDrug } from '../actions/DopeActions';
import { drugBust, drugCheaper, drugExpensive, visit } from '../actions/CityActions';

function CityScreen(props: any) {
  const { navigation } = props;

  const { cityState, dopeState } = useSelector((state: RootState) => state);
  const drugs: DrugForSale[] = cityState.drugsForSale;

  const dispatch = useDispatch();

  const numre = /^[0-9\b]+$/;

  const [eventVisible, setEventVisible] = React.useState(false);
  const [eventMessage, setEventMessage] = React.useState("");
  const [eventIndex, setEventIndex] = React.useState(0);
  const [buyVisible, setBuyVisible] = React.useState(false);
  const [buyError, setBuyError] = React.useState(false);
  const [sellVisible, setSellVisible] = React.useState(false);
  const [sellError, setSellError] = React.useState(false);
  const [amountToBuy, setAmountToBuy] = React.useState('');
  const [amountToSell, setAmountToSell] = React.useState('');
  const [activeDrug, setActiveDrug] = React.useState({ drug: Drug.Acid, price: 0 });

  const sellDialog = () =>
    setSellVisible(true);

  const closeSellDialog = () => {
    setAmountToSell('');
    setSellVisible(false);
  }

  const buyDialog = () =>
    setBuyVisible(true);

  const closeBuyDialog = () => {
    setAmountToBuy('');
    setBuyVisible(false);
  }

  const eventDialog = () =>
    setEventVisible(true);

  const handleNextEvent = () => {
    if (eventIndex < cityState.events.length) {
      let event = cityState.events[eventIndex];
      switch(event.event) {
        case EventTypes.drugBust:
          dispatch(drugBust(event.drug));
          break;
        case EventTypes.drugCheaper:
          dispatch(drugCheaper(event.drug));
          break;
        case EventTypes.drugFree:
          dispatch(freeDrug(event.drug));
          break;
        case EventTypes.drugExpensive:
          dispatch(drugExpensive(event.drug));
          break;
      }
      setEventMessage(event.message);
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
        <View style={styles.location}>
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
          <Card>
            <Card.Content>
              <Text>Cash on Hand: {dopeState.cash}</Text>
              <Text>Health: {dopeState.health}</Text>
              <Text>Cash in Bank: {dopeState.bank}</Text>
              <Text>Loan owed: {dopeState.loan}</Text>
              <Text>Days remaining: {dopeState.days}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  navigation.navigate('Jet');
                }}
                mode="contained"
                icon="car-side">
                Leave
              </Button>
            </Card.Actions>
          </Card>
        </View>


        <Portal>
          <Dialog
            visible={buyVisible}
            onDismiss={closeBuyDialog}>
            <Dialog.Title>Buy {activeDrug.drug}</Dialog.Title>
            <Dialog.Content>
              {activeDrug.price != 0 ?
                (activeDrug.price < dopeState.cash ?
                  (<View>
                    <Text variant="bodyMedium">How much {activeDrug.drug} do you want to buy?</Text>
                    <TextInput
                      value={amountToBuy}
                      onChangeText={(value) => {
                        if (value == '' || numre.test(value)) {
                          let val = Number(value);
                          if (activeDrug.price * val > dopeState.cash || val + dopeState.capacityUsed > dopeState.capacity) {
                            setBuyError(true);
                          } else {
                            setBuyError(false);
                          }
                          setAmountToBuy(value);
                        }
                      }}
                      error={buyError} />
                    {buyError && <Text style={styles.error}>You cannot afford that much {activeDrug.drug}</Text>}
                  </View>)
                  : (<Text variant="bodyMedium">You cannot afford any {activeDrug.drug}.</Text>)
                )
                :
                (<Text variant="bodyMedium">No one is selling {activeDrug.drug} here.</Text>)
              }
            </Dialog.Content>
            <Dialog.Actions>
              {(activeDrug.price != 0 && activeDrug.price < dopeState.cash) &&
                <Button
                  disabled={amountToBuy == '' || Number(amountToBuy) == 0 || buyError}
                  onPress={() => {
                    dispatch(buyDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: Number(amountToBuy) }));
                    closeBuyDialog();
                  }}>Buy</Button>
              }
              <Button onPress={closeBuyDialog}>
                {(activeDrug.price != 0 && activeDrug.price < dopeState.cash) ? "Cancel" : "Close"}
              </Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog
            visible={sellVisible}
            onDismiss={closeSellDialog}>
            <Dialog.Title>Sell {activeDrug.drug}</Dialog.Title>
            <Dialog.Content>
              {dopeState.drugs[activeDrug.drug] > 0
                ? activeDrug.price != 0 ?
                  (<Text variant="bodyMedium">How much {activeDrug.drug} do you want to sell? You can sell up to {dopeState.drugs[activeDrug.drug]}</Text>)
                  :
                  (<Text variant="bodyMedium">No one is interested in buying {activeDrug.drug} here. You may dump some of your suppy.</Text>)
                :
                (<Text variant="bodyMedium">You do not have any {activeDrug.drug}.</Text>)
              }
              {dopeState.drugs[activeDrug.drug] > 0 && <TextInput
                value={amountToSell}
                onChangeText={(value) => {
                  if (value == '' || numre.test(value)) {
                    let val = Number(value);
                    if (val > dopeState.drugs[activeDrug.drug]) {
                      setSellError(true);
                    } else {
                      setSellError(false);
                    }
                  }
                  setAmountToSell(value)
                }}
                error={sellError} />}
              {sellError && <Text style={styles.error}>You do not have that much {activeDrug.drug}</Text>}
            </Dialog.Content>
            <Dialog.Actions>
              {dopeState.drugs[activeDrug.drug] > 0 &&
                <Button
                  disabled={amountToSell == '' || Number(amountToSell) == 0 || sellError}
                  onPress={() => {
                    dispatch(sellDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: Number(amountToSell) }));
                    closeSellDialog();
                  }}>{(activeDrug.price != 0 ? "Sell" : "Dump")}</Button>
              }
              <Button onPress={closeSellDialog}>
                {dopeState.drugs[activeDrug.drug] > 0 ? "Cancel" : "Close"}
              </Button>
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
  location: {
    width: '100%'
  },
  error: {
    color: 'darkred'
  }
});

export default CityScreen;
