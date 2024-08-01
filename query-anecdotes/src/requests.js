import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => axios.get(baseUrl).then((res) => res.data);

const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);

const updateVote = (id, votes) =>
  axios.patch(`${baseUrl}/${id}`, {votes: votes + 1}).then((res) => res.data);

export {getAnecdotes, createAnecdote, updateVote};
