import {createSlice} from "@reduxjs/toolkit";
import {appendAnecdote, createAnecdote, voteAnecdote} from "./anecdoteReducer";
import store from "../store";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    cleanNotification() {
      return "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(appendAnecdote, (state, action) => {
      console.log("noti-createAnec", state, action);
      state = `you created ${action.payload.content}`;
      setTimeout(() => {
        store.dispatch(notificationSlice.actions.cleanNotification());
      }, 5000);

      return state;
    });
    builder.addCase(voteAnecdote, (state, action) => {
      console.log("noti-voteAnec", state, action);
      state = `you voted '${action.payload.content}'`;
      setTimeout(() => {
        store.dispatch(notificationSlice.actions.cleanNotification());
      }, 5000);

      return state;
    });
  },
});

console.log(notificationSlice.selectors);

export default notificationSlice.reducer;
