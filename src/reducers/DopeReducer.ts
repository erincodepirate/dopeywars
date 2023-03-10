import { Drug, Weapon } from '../Enums';
import { borrowMoney, buyDrug, caughtByPolice, decrementDay, depositMoney, freeDrug, newGame, payLoan, sellDrug, upgradeBag, withdrawMoney } from '../actions/DopeActions';
import { createReducer } from '@reduxjs/toolkit'
import { DrugMap } from '../Interfaces';
import _ from 'lodash';
import { getRandom } from '../Helpers';

export interface DopeState {
    drugs: DrugMap,
    cash: number,
    bank: number,
    loan: number,
    health: number,
    weapon: Weapon,
    capacityUsed: number,
    capacityRemaining: number,
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
    capacityUsed: 0,
    capacityRemaining: 100,
    capacity: 100,
    days: 31
};

function totalInBag(state: DopeState) {
    let total = 0;
    for (const [drugString, drugEnum] of Object.entries(Drug)) {
        const held = state.drugs[drugEnum];
        total += held;
    }
    return total;
}

function capacityRemaining(state: DopeState) {
    return state.capacity - state.capacityUsed;
}

export const dopeReducer = createReducer(
    INITIAL_STATE,
    (builder) => {
        builder
            .addCase(buyDrug, (state, action) => {
                var s = _.cloneDeep(state);
                var drug = action.payload;
                if (drug) {
                    s.cash -= drug.amount * drug.price;
                    var drugsHeld = s.drugs[drug.drug];
                    var newAmount = drug.amount + drugsHeld;
                    s.drugs[drug.drug] = newAmount
                    s.capacityUsed = totalInBag(s);
                    s.capacityRemaining = capacityRemaining(s);
                }
                return s;
            })
            .addCase(sellDrug, (state, action) => {
                var s = _.cloneDeep(state);
                var drug = action.payload;
                if (drug) {
                    s.cash += drug.amount * drug.price;
                    var drugsHeld = s.drugs[drug.drug];
                    var newAmount = drugsHeld - drug.amount;
                    s.drugs[drug.drug] = newAmount
                    s.capacityUsed = totalInBag(s);
                    s.capacityRemaining = capacityRemaining(s);
                }
                return s;
            })
            .addCase(freeDrug, (state, action) => {
                var s = _.cloneDeep(state);
                var drug = action.payload;
                let numDrugs = 2 + getRandom(4); // 2-5 drugs found
                if (drug) {
                    var drugsHeld = s.drugs[drug.drug];
                    // find a number of drugs that you can hold without going over capacity
                    while (numDrugs + totalInBag(s) > s.capacity) {
                        numDrugs -= 1;
                    }
                    var newAmount = drugsHeld + numDrugs;
                    s.drugs[drug.drug] = newAmount
                    s.capacityUsed = totalInBag(s);
                    s.capacityRemaining = capacityRemaining(s);
                }
                return s;
            })
            .addCase(decrementDay, (state, action) => {
                var s = _.cloneDeep(state);
                s.days--;
                // add interest to bank account and loan
                if (s.days < 30 && s.days > 0) {
                    s.bank = s.bank + Math.floor(s.bank * .0625);
                    s.loan = s.loan + Math.floor(s.loan * .125);
                }
                return s;
            })
            .addCase(payLoan, (state, action) => {
                var s = _.cloneDeep(state);
                s.loan -= action.payload;
                s.cash -= action.payload;
                return s;
            })
            .addCase(borrowMoney, (state, action) => {
                var s = _.cloneDeep(state);
                s.loan += action.payload;
                s.cash += action.payload;
                return s;
            })
            .addCase(depositMoney, (state, action) => {
                var s = _.cloneDeep(state);
                s.bank += action.payload;
                s.cash -= action.payload;
                return s;
            })
            .addCase(withdrawMoney, (state, action) => {
                var s = _.cloneDeep(state);
                s.bank -= action.payload;
                s.cash += action.payload;
                return s;
            })
            .addCase(newGame, (state, action) => {
                var s = _.cloneDeep(INITIAL_STATE);
                return s;
            })
            .addCase(upgradeBag, (state, action) => {
                var s = _.cloneDeep(state);
                s.cash -= action.payload.price;
                s.capacity += action.payload.capacity;
                s.capacityRemaining = capacityRemaining(s);
                return s;
            })
            .addCase(caughtByPolice, (state, action) => {
                var s = _.cloneDeep(state);
                for (const [drugString, drugEnum] of Object.entries(Drug)) {
                    s.drugs[drugEnum] = 0;
                }
                s.capacityUsed = 0;
                s.capacityRemaining = capacityRemaining(s);
                s.cash = Math.floor(s.cash / 2);
                return s;
            })
    }
);
