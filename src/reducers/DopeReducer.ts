import { Drug, Weapon } from '../Enums';
import { Actions, DopeAction } from '../actions/DopeActions';
import { DopeState, DrugMap } from '../Interfaces';
import _ from 'lodash';

// setup initial state
const INITIAL_STATE: DopeState = {
    drugs: {
        Acid: 0,
        Cocaine: 0,
        Ecstacy: 0,
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
    weapon: Weapon.Hands
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
            return s
        case Actions.SELL_DRUG:
            var s = _.cloneDeep(state);
            var drug = action.payload;
            if (drug) {
                s.cash += drug.amount * drug.price;
                var drugsHeld = s.drugs[drug.drug];
                var newAmount = drugsHeld - drug.amount;
                s.drugs[drug.drug] = newAmount
            }
            return s
    }
};
