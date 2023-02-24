import { City, Drug, Weapon } from '../Enums';
import { Actions, CityAction } from '../actions/CityActions';
import { DrugMap, DrugForSale } from '../Interfaces';
import _ from 'lodash';

export type CityStateMap = {
    [id in City]: CityState
}

export interface CityState {
    drugsForSale: DrugForSale[],
    weaponAvailable: Weapon,
}

export interface CitiesState {
    cities: CityStateMap,
    currentCity: City
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

const initialCityState: CityState = {
    drugsForSale: [],
    weaponAvailable: Weapon.Hands,
}
// setup initial state
const INITIAL_STATE: CitiesState =
{
    cities:
    {
        "Bronx": initialCityState,
        "Ghetto": initialCityState,
        "Central Park": initialCityState,
        "Manhattan": initialCityState,
        "Coney Island": initialCityState,
        "Brooklyn": initialCityState
    },
    currentCity: City.Bronx
};


export const cityReducer = (state = INITIAL_STATE, action: CityAction) => {
    switch (action.type) {
        default:
            return state
        case Actions.FIRST_LOAD:
            var s = _.cloneDeep(state);
            for (const [cityString, cityEnum] of Object.entries(City)) {
                const newDrugsForSale: DrugForSale[] = []
                for (const [drugString, drugEnum] of Object.entries(Drug)) {
                    newDrugsForSale.push({ drug: drugEnum, price: defaultDrugPrices[drugEnum] })
                }
                s.cities[cityEnum] = { drugsForSale: newDrugsForSale, weaponAvailable: Weapon.Hands };
            }
            return s
        case Actions.LOAD_CITY:
            var s = _.cloneDeep(state);
            var city = action.payload;
            if (city) {
                s.currentCity = city;
            }
            return s
    }
};
