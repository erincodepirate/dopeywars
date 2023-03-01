import { City, Drug, Weapon } from '../Enums';
import { Actions, CityAction } from '../actions/CityActions';
import { DrugMap, DrugForSale } from '../Interfaces';
import _ from 'lodash';

export interface CityState {
    drugsForSale: DrugForSale[],
    weaponAvailable: Weapon,
    currentCity: City | null,
    hasVisited: boolean,
    messages: String[]
}

const defaultDrugPrices: DrugMap = {
    Acid: 1000,
    Cocaine: 12000,
    Ecstasy: 20,
    PCP: 1000,
    Heroin: 5000,
    Weed: 200,
    Shrooms: 500,
    Speed: 100
}

const INITIAL_STATE: CityState =
{
    drugsForSale: [],
    weaponAvailable: Weapon.Hands,
    currentCity: null,
    hasVisited: false,
    messages: []
};


const eventMethods = {
    cheaper: (drug: DrugForSale) => { // drug has become cheaper
        let divisor = 7 + Math.floor(Math.random() * 4);
        drug.price /= divisor;
        let message = "The market has been flooded with" + drug.drug + "!"
        return { result: drug, message: message }
    },
    bust: (drug: DrugForSale) => { // cops did a bust, drug becomes more expensive
        let multiplier = 3 + Math.floor(Math.random() * 3);
        drug.price *= multiplier;
        let message = "The cops just did a " + drug.drug + " bust! Prices went way up!"
        return { result: drug, message: message }
    },
    expensive: (drug: DrugForSale) => { // addicts are buying drug at a higher price
        let multiplier = 2 + Math.floor(Math.random() * 2);
        drug.price *= multiplier;
        let message = "Addicts are buying " + drug.drug + " at a high price! Prices went way up!"
        return { result: drug, message: message }
    },
    free: (drug: DrugForSale) => { // found some free of this drug
        let message = "You found some " + drug.drug + " on a dead person in the subway!"
        return { result: drug, message: message }
    }
}

const events = [
    { freq: 18, func: eventMethods.bust, drug: Drug.Weed },
    { freq: 15, func: eventMethods.bust, drug: Drug.PCP },
    { freq: 13, func: eventMethods.bust, drug: Drug.Heroin },
    { freq: 18, func: eventMethods.bust, drug: Drug.Ecstasy },
    { freq: 8, func: eventMethods.bust, drug: Drug.Cocaine },
    { freq: 16, func: eventMethods.bust, drug: Drug.Speed },
    { freq: 10, func: eventMethods.expensive, drug: Drug.Heroin },
    { freq: 13, func: eventMethods.expensive, drug: Drug.Speed },
    { freq: 8, func: eventMethods.expensive, drug: Drug.Cocaine },
    { freq: 15, func: eventMethods.expensive, drug: Drug.PCP },
    { freq: 16, func: eventMethods.expensive, drug: Drug.Shrooms },
    { freq: 20, func: eventMethods.cheaper, drug: Drug.Weed },
    { freq: 19, func: eventMethods.cheaper, drug: Drug.Speed },
    { freq: 3, func: eventMethods.free, drug: Drug.Cocaine },
    { freq: 5, func: eventMethods.free, drug: Drug.Acid },
    { freq: 8, func: eventMethods.free, drug: Drug.PCP }
]


export const cityReducer = (state = INITIAL_STATE, action: CityAction) => {
    switch (action.type) {
        default:
            return state
        case Actions.LOAD_CITY:
            var s = _.cloneDeep(state);
            var city = action.payload;
            if (city) {
                s.currentCity = city;
            }
            const newDrugsForSale: DrugForSale[] = []
            for (const [drugString, drugEnum] of Object.entries(Drug)) {
                // randomize the price a little
                let price = defaultDrugPrices[drugEnum];
                price = price + Math.floor(price * Math.random());
                newDrugsForSale.push({ drug: drugEnum, price: price })
            }
            // randomly remove up to 3 drugs
            let randomRemove = Math.floor(Math.random() * 4);
            let randomIndexes = new Set();
            for (let i = 0; i < randomRemove; i++) {
                let randomIndex = Math.floor(Math.random() * newDrugsForSale.length);
                while (randomIndexes.has(randomIndex)) {
                    randomIndex = Math.floor(Math.random() * newDrugsForSale.length);
                }
                randomIndexes.add(randomIndex);
                newDrugsForSale[randomIndex].price = 0;
            }
            s.drugsForSale = newDrugsForSale
            s.hasVisited = false;
            return s;
        case Actions.VISIT:
            var s = _.cloneDeep(state);
            s.hasVisited = true;
            return s;
    }
};
