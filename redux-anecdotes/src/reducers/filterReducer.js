import {createSlice} from "@reduxjs/toolkit";

const initialState = "";

/*const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      return action.payload;
    }
    default:
      return state;
  }
};

export const updateFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};
export default reducer;*/

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter(state, action) {
      const filter = action.payload;
      return filter;
    },
  },
});

console.log(filterSlice.selectors, "selectors");
console.log(filterSlice.getSelectors(), "selectors");
export const {updateFilter} = filterSlice.actions;

export default filterSlice.reducer;
