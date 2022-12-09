import { createSelector } from "reselect";

const campsSlice = state => state.camps

export const selectCampsIsLoading = state => state.camps.isLoading