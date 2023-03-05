import { City } from "../Enums";
import { createAction } from "@reduxjs/toolkit";
import { DrugForSale } from "../Interfaces";

export const loadCity = createAction<City>('LOAD_CITY');
export const visit = createAction('VISIT');
export const drugCheaper = createAction<DrugForSale>('DRUG_CHEAPER');
export const drugExpensive = createAction<DrugForSale>('DRUG_EXPENSIVE');
export const drugBust = createAction<DrugForSale>('DRUG_BUST');
