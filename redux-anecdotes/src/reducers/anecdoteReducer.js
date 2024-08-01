import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

/*const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];*/

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

//const initialState = anecdotesAtStart.map(asObject);

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = asObject(action.payload);

      state.push(newAnecdote);
    },

    voteAnecdote(state, action) {
      const {id} = action.payload;

      return state.map((anecdote) => {
        if (anecdote.id === id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          };
        }
        return anecdote;
      });
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const {voteAnecdote, appendAnecdote, setAnecdotes} =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = asObject(content);
    const anecdote = await anecdoteService.createNew(newAnecdote);
    dispatch(appendAnecdote(anecdote));
  };
};

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.updateVote(anecdote.id, anecdote.votes + 1);
    dispatch(voteAnecdote(anecdote));
  };
};

export default anecdoteSlice.reducer;
/*const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE_ANECDOTE": {
      const id = action.payload;
      return state.map((anecdote) => {
        if (anecdote.id === id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          };
        }
        return anecdote;
      });
    }
    case "ADD_ANECDOTE": {
      console.log("add_anecdote", action.payload);
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

export function createAnecdote(anecdote) {
  console.log(anecdote, "anecdote");
  return {
    type: "ADD_ANECDOTE",
    payload: {
      id: getId(),
      votes: 0,
      content: anecdote,
    },
  };
}

export function voteAnecdote(id) {
  return {
    type: "VOTE_ANECDOTE",
    payload: id,
  };
}

export default reducer;*/
