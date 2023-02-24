import { AnyAction } from "redux";
import { DrugSale } from "../Interfaces";

export enum actions {
    BUY_DRUG = 'BUY_DRUG',
    SELL_DRUG = 'SELL_DRUG'
}

export interface DopeAction extends AnyAction {
    type: actions,
    payload?: DrugSale
}

export const buyDrug = (drugSale:DrugSale) => (
    {
      type: actions.BUY_DRUG,
      payload: drugSale,
    }
);

export const sellDrug = (drugSale:DrugSale) => (
    {
      type: actions.SELL_DRUG,
      payload: drugSale,
    }
);
  