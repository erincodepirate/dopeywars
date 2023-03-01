import { Drug, Weapon } from '../Enums';
import { Actions, DopeAction } from '../actions/DopeActions';
import { DrugMap } from '../Interfaces';
import _ from 'lodash';

export interface DopeState {
    drugs: DrugMap,
    cash: number,
    bank: number,
    loan: number,
    health: number,
    weapon: Weapon,
    capacity: number,
    days: number,
}

// setup initial state
const INITIAL_STATE: DopeState = {
    drugs: {
        Acid: 0,
        Cocaine: 0,
        Ecstasy: 0,
        PCP: 0,
        Heroin: 0,
        Weed: 0,
        Shrooms: 0,
        Speed: 0
    },
    cash: 2000,
    bank: 0,
    loan: 5500,
    health: 100,
    weapon: Weapon.Hands,
    capacity: 100,
    days: 31
};


export const dopeReducer = (state = INITIAL_STATE, action: DopeAction) => {
    switch (action.type) {
        default:
            return state
        case Actions.BUY_DRUG:
            var s = _.cloneDeep(state);
            var drug = action.payload;
            if (drug) {
                s.cash -= drug.amount * drug.price;
                var drugsHeld = s.drugs[drug.drug];
                var newAmount = drug.amount + drugsHeld;
                s.drugs[drug.drug] = newAmount
            }
            return s;
        case Actions.SELL_DRUG:
            var s = _.cloneDeep(state);
            var drug = action.payload;
            if (drug) {
                s.cash += drug.amount * drug.price;
                var drugsHeld = s.drugs[drug.drug];
                var newAmount = drugsHeld - drug.amount;
                s.drugs[drug.drug] = newAmount
            }
            return s;
        case Actions.DECREMENT_DAY:
            var s = _.cloneDeep(state);
            s.days--;
            return s;
    }
};
