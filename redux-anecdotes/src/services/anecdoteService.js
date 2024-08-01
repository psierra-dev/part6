import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

async function getAll() {
  const response = await axios.get(baseURL);
  return response.data;
}

const createNew = async (object) => {
  const response = await axios.post(baseURL, object);
  return response.data;
};

const updateVote = async (id, votes) => {
  const response = await axios.patch(`${baseURL}/${id}`, {
    votes,
  });

  return response.data;
};

export default {getAll, createNew, updateVote};
