import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateVote} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotesSorted = useSelector((state) =>
    [...state.anecdotes].sort((a, b) => b.votes - a.votes)
  );
  const filter = useSelector((state) => state.filter);

  let anecdotesFilter;

  if (filter.length === 0) {
    anecdotesFilter = anecdotesSorted;
  } else {
    anecdotesFilter = anecdotesSorted.filter((anecdote) =>
      anecdote.content.toUpperCase().startsWith(filter.toUpperCase())
    );
  }

  const vote = (anecdote) => {
    dispatch(updateVote(anecdote));
  };

  return (
    <div>
      {anecdotesFilter.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
