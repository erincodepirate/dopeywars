import { City, Drug, Weapon } from '../Enums';
import { Actions, CityAction } from '../actions/CityActions';
import { DrugMap, DrugForSale } from '../Interfaces';
import _ from 'lodash';

export interface CityState {
    drugsForSale: DrugForSale[],
    weaponAvailable: Weapon,
    currentCity: City | null,
    hasVisited: boolean,
}

const defaultDrugPrices: DrugMap = {
    Acid: 1000,
    Cocaine: 12000,
    Ecstacy: 20,
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
};


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
                newDrugsForSale.push({ drug: drugEnum, price: price})
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
