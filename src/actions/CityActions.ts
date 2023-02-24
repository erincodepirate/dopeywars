import { AnyAction } from "redux";
import { City } from "../Enums";

export enum Actions {
  FIRST_LOAD = 'FIRST_LOAD',
  LOAD_CITY = 'LOAD_CITY',
}

export interface CityAction extends AnyAction {
  type: Actions,
  payload?: City
}

export const firstLoad = () => (
  {
    type: Actions.FIRST_LOAD
  }
);

export const loadCity = (city: City) => (
  {
    type: Actions.LOAD_CITY,
    payload: city,
  }
);
