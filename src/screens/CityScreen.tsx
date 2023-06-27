import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Dimensions, AppState } from 'react-native';
import { TextInput, Button, Dialog, Portal, Provider, Text, TouchableRipple, Card, HelperText, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { City, Drug, EventTypes } from '../Enums';
import { RootState, DrugForSale } from '../Interfaces';
import { borrowMoney, buyDrug, caughtByPolice, decrementDay, depositMoney, freeDrug, payLoan, sellDrug, upgradeBag, withdrawMoney } from '../actions/DopeActions';
import { drugBust, drugCheaper, drugExpensive, loadCity, visit } from '../actions/CityActions';
import { getRandom } from '../Helpers';
import { CardStyleInterpolators } from '@react-navigation/stack';

const ITEM_HEIGHT = 48;

function CityScreen(props: any) {
  const { route, navigation } = props;
  const { place } = route.params;

  const currentCity = useSelector((state: RootState) => state.cityState.currentCity);
  const events = useSelector((state: RootState) => state.cityState.events);
  const newBagForSale = useSelector((state: RootState) => state.cityState.newBagForSale);
  const policeEncounter = useSelector((state: RootState) => state.cityState.policeEncounter);
  const drugsForSale = useSelector((state: RootState) => state.cityState.drugsForSale);

  const cash = useSelector((state: RootState) => state.dopeState.cash);
  const loan = useSelector((state: RootState) => state.dopeState.loan);
  const capacityRemaining = useSelector((state: RootState) => state.dopeState.capacityRemaining);
  const drugs = useSelector((state: RootState) => state.dopeState.drugs);
  const bank = useSelector((state: RootState) => state.dopeState.bank);
  const capacityUsed = useSelector((state: RootState) => state.dopeState.capacityUsed);
  const capacity = useSelector((state: RootState) => state.dopeState.capacity);
  const days = useSelector((state: RootState) => state.dopeState.days);

  const dispatch = useDispatch();

  const theme = useTheme();


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

  const [bankVisible, setBankVisible] = React.useState(false);
  const [bankState, setBankState] = React.useState(0); // 0 is menu, 1 is withdraw, 2 is deposit
  const [bankAmount, setBankAmount] = React.useState('');
  const [bankError, setBankError] = React.useState(false);

  const [loanVisible, setLoanVisible] = React.useState(false);
  const [loanState, setLoanState] = React.useState(0); // 0 is menu, 1 is repay, 2 is borrow
  const [loanAmount, setLoanAmount] = React.useState('');
  const [loanError, setLoanError] = React.useState(false);
  const [loanBorrowed, setLoanBorrowed] = React.useState(false); // only allow borrowing once per day

  const [activeDrug, setActiveDrug] = React.useState({ drug: Drug.Acid, price: 0 });

  const [policeVisible, setPoliceVisible] = React.useState(false);
  const [attemptedToRun, setAttemptedToRun] = React.useState(false);
  const [ranFromPolice, setRanFromPolice] = React.useState(false);

  const [bagVisible, setBagVisible] = React.useState(false);

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

  const howMuchCanIBuy = (price: number) => {
    let totalAfford = Math.floor(cash / price);
    if (totalAfford > capacityRemaining) {
      return capacityRemaining;
    }
    return totalAfford;
  }

  const bankDialog = () => {
    setBankVisible(true);
  }

  const closeBankDialog = () => {
    setBankVisible(false);
    setBankAmount('');
    setBankState(0);
  }

  const loanDialog = () => {
    setLoanVisible(true);
  }

  const closeLoanDialog = () => {
    setLoanVisible(false);
    setLoanAmount('');
    setLoanState(0);
  }

  const eventDialog = () =>
    setEventVisible(true);

  const handleNextEvent = () => {
    if (eventIndex < events.length) {
      let event = events[eventIndex];
      switch (event.event) {
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
      eventDialog();
      setEventIndex(eventIndex + 1);
    }
  }

  const closeEventDialog = () => {
    setEventVisible(false);
    handleNextEvent();
  }

  const bagDialog = () => {
    setBagVisible(true);
  }

  const closeBagDialog = () => {
    setBagVisible(false);
  }

  const policeDialog = () => {
    setPoliceVisible(true);
  }

  const closePoliceDialog = () => {
    setPoliceVisible(false);
  }

  useEffect(() => {
    if (place != currentCity) {
      dispatch(decrementDay());
      dispatch(loadCity(place));
      if (newBagForSale) {
        bagDialog();
      }
      if (policeEncounter) {
        policeDialog();
      }
      if (eventIndex < events.length) {
        handleNextEvent();
      }
    }
  }, []);

  const windowDimensions = Dimensions.get('window');
  const screenDimensions = Dimensions.get('screen');


  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });
  const { height, width } = dimensions.window;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width,
      height: height
    },
    table: {
      justifyContent: 'center',
      width: '100%',
    },
    row: {
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.onBackground,
      minHeight: 48,
      paddingHorizontal: 16,
      flexDirection: 'row',
    },
    header: {
      flexDirection: 'row',
      minHeight: 48,
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth * 2,
      borderColor: theme.colors.onBackground,
    },
    cell: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cellText: {
    },
    location: {
      width: '100%',
      flexWrap: 'wrap'
    },
    error: {
      color: 'darkred'
    },
    stats: {
      width: '100%',
    },
  });


  if (height < width) {
    styles.table.width = "50%";
    styles.stats.width = "50%";
    styles.row.minHeight = 30;
    styles.header.minHeight = 30;
  }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
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
            <FlatList data={drugsForSale} renderItem={({ item }) => {
              return (
                <View key={item.drug} style={styles.row}>
                  <TouchableRipple style={styles.cell} onPress={() => {
                    setActiveDrug(item);
                    sellDialog();
                  }}>
                    <Text style={styles.cellText}>{
                      drugs ? drugs[item.drug] : 0
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
            }}
              keyExtractor={(drug: DrugForSale) => drug.drug}
              getItemLayout={(data, index) => (
                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
              )}
            />

          </View>
          <Card style={styles.stats}>
            <Card.Content>
              <Text>Cash on Hand: ${cash}</Text>
              <Text>Cash in Bank: ${bank}</Text>
              <Text>Loan owed: ${loan}</Text>
              <Text>Bag capacity: {capacityUsed} / {capacity}</Text>
              <Text>Days remaining: {days}</Text>
            </Card.Content>
            <Card.Actions>
              {currentCity == City.Bronx && (
                <Button
                  onPress={bankDialog}
                  mode="contained"
                  icon="piggy-bank">
                  Bank
                </Button>
              )}
              {currentCity == City.Bronx && (
                <Button
                  onPress={loanDialog}
                  mode="contained"
                  icon="shark">
                  Loan Shark
                </Button>
              )}
              <Button
                onPress={() => {
                  if (days == 0) {
                    props.navigation.navigate('Gameover');
                  } else {
                    navigation.navigate('Jet');
                  }
                }}
                mode="contained"
                icon="car-side">
                Leave
              </Button>
            </Card.Actions>
          </Card>
        </View>


        <Portal>
          {/* Buy dialog */}
          <Dialog
            visible={buyVisible}
            onDismiss={closeBuyDialog}>
            <Dialog.Title>Buy {activeDrug.drug}</Dialog.Title>
            <Dialog.Content>
              {activeDrug.price != 0 ?
                (activeDrug.price < cash ?
                  (<View>
                    <Text variant="bodyMedium">
                      You can buy up to {howMuchCanIBuy(activeDrug.price)} of {activeDrug.drug}. How much do you want to buy?</Text>
                    <TextInput
                      value={amountToBuy}
                      onChangeText={(value) => {
                        if (value == '' || numre.test(value)) {
                          let val = Number(value);
                          if (activeDrug.price * val > cash || val > capacityRemaining) {
                            setBuyError(true);
                          } else {
                            setBuyError(false);
                          }
                          setAmountToBuy(value);
                        }
                      }}
                      error={buyError} />
                    <HelperText type="error" visible={buyError}>
                      {activeDrug.price * Number(amountToBuy) > cash ?
                        "You cannot afford that much " :
                        "You do not have room to hold that much"} {activeDrug.drug}.
                    </HelperText>
                  </View>)
                  : (<Text variant="bodyMedium">You cannot afford any {activeDrug.drug}.</Text>)
                )
                :
                (<Text variant="bodyMedium">No one is selling {activeDrug.drug} here.</Text>)
              }
            </Dialog.Content>
            <Dialog.Actions>
              {(activeDrug.price != 0 && activeDrug.price < cash) &&
                <>
                  <Button
                    onPress={() => {
                      dispatch(buyDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: howMuchCanIBuy(activeDrug.price) }));
                      closeBuyDialog();
                    }}>Max Amount</Button>
                  <Button
                    disabled={amountToBuy == '' || Number(amountToBuy) == 0 || buyError}
                    onPress={() => {
                      dispatch(buyDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: Number(amountToBuy) }));
                      closeBuyDialog();
                    }}>Buy</Button>
                </>
              }
              <Button onPress={closeBuyDialog}>
                {(activeDrug.price != 0 && activeDrug.price < cash) ? "Cancel" : "Close"}
              </Button>
            </Dialog.Actions>
          </Dialog>

          {/* Sell dialog */}
          <Dialog
            visible={sellVisible}
            onDismiss={closeSellDialog}>
            <Dialog.Title>Sell {activeDrug.drug}</Dialog.Title>
            <Dialog.Content>
              {drugs[activeDrug.drug] > 0
                ? activeDrug.price != 0 ?
                  (<Text variant="bodyMedium">
                    You can sell up to {drugs[activeDrug.drug]} {activeDrug.drug}. How much do you want to sell?
                  </Text>)
                  :
                  (<Text variant="bodyMedium">No one is interested in buying {activeDrug.drug} here. You may dump some of your suppy.</Text>)
                :
                (<Text variant="bodyMedium">You do not have any {activeDrug.drug}.</Text>)
              }
              {drugs[activeDrug.drug] > 0 && <TextInput
                value={amountToSell}
                onChangeText={(value) => {
                  if (value == '' || numre.test(value)) {
                    let val = Number(value);
                    if (val > drugs[activeDrug.drug]) {
                      setSellError(true);
                    } else {
                      setSellError(false);
                    }
                    setAmountToSell(value);
                  }
                }}
                error={sellError} />}
              <HelperText type="error" visible={sellError}>
                You do not have that much {activeDrug.drug}
              </HelperText>
            </Dialog.Content>
            <Dialog.Actions>
              {drugs[activeDrug.drug] > 0 &&
                <>
                  <Button
                    onPress={() => {
                      dispatch(sellDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: drugs[activeDrug.drug] }));
                      closeSellDialog();
                    }}>Max Amount</Button>
                  <Button
                    disabled={amountToSell == '' || Number(amountToSell) == 0 || sellError}
                    onPress={() => {
                      dispatch(sellDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: Number(amountToSell) }));
                      closeSellDialog();
                    }}>{(activeDrug.price != 0 ? "Sell" : "Dump")}</Button>
                </>
              }
              <Button onPress={closeSellDialog}>
                {drugs[activeDrug.drug] > 0 ? "Cancel" : "Close"}
              </Button>
            </Dialog.Actions>
          </Dialog>

          {/* Event dialog */}
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

          {/* Bank dialog */}
          <Dialog
            visible={bankVisible}
            onDismiss={closeBankDialog}>
            <Dialog.Title>Bank</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                {bankState == 0 && "Welcome to the bank, would you like to withdraw or deposit?"}
                {bankState == 1 && "How much would you like to withdraw?"}
                {bankState == 2 && "How much would you like to deposit?"}
              </Text>
              {bankState > 0 && <View><TextInput
                value={bankAmount}
                onChangeText={(value) => {
                  if (value == '' || numre.test(value)) {
                    let val = Number(value);
                    if (
                      (bankState == 1 &&
                        val > bank) ||
                      (bankState == 2 &&
                        val > cash)) {
                      setBankError(true);
                    } else {
                      setBankError(false);
                    }
                    setBankAmount(value);
                  }
                }}
                error={bankError} />
                <HelperText type="error" visible={bankError}>
                  {bankState == 1 && "You cannot withdraw that much."}
                  {bankState == 2 && "You do not have that much to deposit."}
                </HelperText></View>}
            </Dialog.Content>
            {bankState == 0 && (
              <Dialog.Actions>
                <Button onPress={() => setBankState(1)}>Withdraw</Button>
                <Button onPress={() => setBankState(2)}>Deposit</Button>
                <Button onPress={closeBankDialog}>Done</Button>
              </Dialog.Actions>
            )}
            {bankState > 0 && (
              <Dialog.Actions>
                <Button
                  disabled={bankAmount == '' || Number(bankAmount) == 0 || bankError}
                  onPress={() => {
                    if (bankState == 1) {
                      dispatch(withdrawMoney(Number(bankAmount)));
                    } else {
                      dispatch(depositMoney(Number(bankAmount)));
                    }
                    setBankAmount('');
                    setBankError(false);
                    setBankState(0);
                  }}>Ok</Button>
                <Button onPress={() => {
                  setBankAmount('');
                  setBankError(false);
                  setBankState(0);
                }}>Cancel</Button>
              </Dialog.Actions>
            )}
          </Dialog>

          {/* Loan shark dialog */}
          <Dialog
            visible={loanVisible}
            onDismiss={closeLoanDialog}>
            <Dialog.Title>Loan Shark</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                {loanState == 0 && "You are visiting the Loan Shark, would you like to repay your debt or borrow?"}
                {loanState == 1 && "You currently owe: $" + loan + ". How much would you like to pay back?"}
                {loanState == 2 && "How much would you like to borrow?"}
              </Text>
              {loanState > 0 && <View><TextInput
                value={loanAmount}
                onChangeText={(value) => {
                  if (value == '' || numre.test(value)) {
                    let val = Number(value);
                    if (
                      (loanState == 1 &&
                        (val > loan
                          || val > cash)) ||
                      (loanState == 2 &&
                        val > cash * 10)) {
                      setLoanError(true);
                    } else {
                      setLoanError(false);
                    }
                    setLoanAmount(value);
                  }
                }}
                error={loanError} />
                <HelperText type="error" visible={loanError}>
                  {loanState == 1 && Number(loanAmount) > loan && Number(loanAmount) < cash &&
                    "You do not owe that much."}
                  {loanState == 1 && Number(loanAmount) > cash &&
                    "You do not have that much cash on hand."}
                  {loanState == 2 && "The loan shark will not loan you that much today."}
                </HelperText></View>}
            </Dialog.Content>
            {loanState == 0 && (
              <Dialog.Actions>
                <Button disabled={loan == 0} onPress={() => setLoanState(1)}>Repay Debt</Button>
                <Button disabled={loanBorrowed && loan > 0} onPress={() => setLoanState(2)}>Borrow</Button>
                <Button onPress={closeLoanDialog}>Done</Button>
              </Dialog.Actions>
            )}
            {loanState > 0 && (
              <Dialog.Actions>
                {loanState == 1 && <Button
                  disabled={cash < loan}
                  onPress={() => {
                    dispatch(payLoan(loan));
                    setLoanAmount('');
                    setLoanError(false);
                    setLoanState(0);
                  }}>Entire Debt</Button>}
                <Button
                  disabled={loanAmount == '' || Number(loanAmount) == 0 || loanError}
                  onPress={() => {
                    if (loanState == 1) {
                      dispatch(payLoan(Number(loanAmount)));
                    } else {
                      setLoanBorrowed(true);
                      dispatch(borrowMoney(Number(loanAmount)));
                    }
                    setLoanAmount('');
                    setLoanError(false);
                    setLoanState(0);
                  }}>Ok</Button>
                <Button onPress={() => {
                  setLoanAmount('');
                  setLoanError(false);
                  setLoanState(0);
                }}>Cancel</Button>
              </Dialog.Actions>
            )}
          </Dialog>

          {/* Police encounter */}
          <Dialog
            visible={policeVisible}
            dismissable={false}>
            <Dialog.Title>Police Encounter</Dialog.Title>
            <Dialog.Content>
              {!attemptedToRun ?
                (<Text>Officer Piggy is on your tail, attempt to run.</Text>) :
                !ranFromPolice ? (<Text>Officer Piggy caught you, you lose all your drugs and half of your money.</Text>) :
                  (<Text>You narrowly escaped Officer Piggy</Text>)
              }
            </Dialog.Content>
            <Dialog.Actions>
              {!attemptedToRun ? (<Button onPress={() => {
                setRanFromPolice(getRandom(3) < 2);
                setAttemptedToRun(true);
              }}>
                Run
              </Button>) :
                (<Button onPress={() => {
                  if (!ranFromPolice) {
                    dispatch(caughtByPolice());
                  }
                  closePoliceDialog();
                }}>
                  {ranFromPolice ? "Whew" : "Bummer"}
                </Button>)
              }
            </Dialog.Actions>
          </Dialog>

          {/* Buy a new bag dialog */}
          <Dialog
            visible={bagVisible}
            onDismiss={closeBagDialog}>
            <Dialog.Title>Buy new bag</Dialog.Title>
            <Dialog.Content>
              <Text>A street vendor is selling a larger bag for $200, would you like to upgrade?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button disabled={cash < 200} onPress={() => {
                dispatch(upgradeBag({ price: 200, capacity: 20 }));
                closeBagDialog();
              }}>
                Yes
              </Button>
              <Button onPress={closeBagDialog}>
                No
              </Button>
            </Dialog.Actions>
          </Dialog>

        </Portal>
      </SafeAreaView>
    </Provider>
  );
}



export default CityScreen;
