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
    Cocaine: 10000,
    Ecstacy: 30,
    PCP: 1500,
    Heroin: 5000,
    Weed: 400,
    Shrooms: 800,
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
                newDrugsForSale.push({ drug: drugEnum, price: defaultDrugPrices[drugEnum] })
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
