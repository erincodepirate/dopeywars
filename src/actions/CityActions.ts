import { AnyAction } from "redux";
import { City } from "../Enums";

export enum Actions {
  LOAD_CITY = 'LOAD_CITY',
  VISIT = 'VISIT'
}

export interface CityAction extends AnyAction {
  type: Actions,
  payload?: City
}

export const loadCity = (city: City) => (
  {
    type: Actions.LOAD_CITY,
    payload: city,
  }
);

export const visit = () => (
  {
    type: Actions.VISIT,
  }
);
