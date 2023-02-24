import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TextInput, Button, Dialog, Portal, Provider, Text, TouchableRipple } from 'react-native-paper';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Drug } from '../Enums';
import { RootState, DrugForSale, DrugHeld } from '../Interfaces';
import { buyDrug, decrementDay, DopeAction, sellDrug } from '../actions/DopeActions';

function CityScreen(props: any) {
  const { navigation } = props;

  const citiesState = useSelector((state: RootState) => state.citiesState);
  const cityState = citiesState.cities[citiesState.currentCity];
  const drugs: DrugForSale[] = cityState.drugsForSale;

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
                    props.drugs ? props.drugs[item.drug] : 0
                  }</Text>
                </TouchableRipple>
                <TouchableRipple style={styles.cell}>
                  <Text style={styles.cellText}>{item.drug}</Text>
                </TouchableRipple>
                <TouchableRipple style={styles.cell} onPress={() => {
                  setActiveDrug(item);
                  buyDialog();
                }}>
                  <Text style={styles.cellText}>${item.price}</Text>
                </TouchableRipple>
              </View>)
          }} keyExtractor={(drug: DrugForSale) => drug.drug} />

        </View>
        <View style={styles.status}>
          <Text>
            Cash on Hand: {props.cash} |
            Health: {props.health} |
            Bank: {props.bank} |
            Loan: {props.loan} |
            Days: {props.days}
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              props.decrementDay();
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
              <Text variant="bodyMedium">How much {activeDrug.drug} do you want to buy?</Text>
              <TextInput onChangeText={(value) => setAmountToBuy(Number(value))} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                props.buyDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: amountToBuy });
                closeBuyDialog();
              }}>Buy</Button>
              <Button onPress={closeBuyDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog
            visible={sellVisible}
            onDismiss={closeSellDialog}>
            <Dialog.Title>Sell {activeDrug.drug}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">How much {activeDrug.drug} do you want to sell?</Text>
              <TextInput onChangeText={(value) => setAmountToSell(Number(value))} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                props.sellDrug({ drug: activeDrug.drug, price: activeDrug.price, amount: amountToSell });
                closeSellDialog();
              }}>Sell</Button>
              <Button onPress={closeSellDialog}>Cancel</Button>
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

const mapStateToProps = (state: RootState) => {
  const { drugs, cash, bank, loan, health, weapon, days } = state.dopeState;
  return { drugs, cash, bank, loan, health, weapon, days }
}

const mapDispatchToProps = (dispatch: Dispatch<DopeAction>) => (
  bindActionCreators({
    buyDrug, sellDrug, decrementDay,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CityScreen);
