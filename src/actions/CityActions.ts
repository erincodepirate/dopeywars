import { City } from "../Enums";
import { createAction } from "@reduxjs/toolkit";

export const loadCity = createAction<City>('LOAD_CITY');
export const visit = createAction('VISIT');
