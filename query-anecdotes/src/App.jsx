import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {getAnecdotes, updateVote} from "./requests";
import NotificationContext from "./NotificationContext";
import {useContext} from "react";

const App = () => {
  const [_, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (newAnecdote) => {
      console.log(newAnecdote, "anecdote-updated");
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      dispatch({
        type: "VOTE_ANECDOTE",
        payload: `anecdote '${newAnecdote.content}' voted`,
      });

      setTimeout(() => {
        dispatch({
          type: "RESET",
        });
      }, 3000);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) => {
          if (anecdote.id === newAnecdote.id) {
            return {
              ...anecdote,
              votes: anecdote.votes + 1,
            };
          }
          return anecdote;
        })
      );
    },
  });
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const handleVote = (anecdote) => {
    console.log("vote");
    updateVoteMutation.mutate(anecdote.id, anecdote.votes);
  };

  if (result.isLoading) {
    return <p>Loading...</p>;
  }

  if (result.isError) {
    return <p>anecdote service not available due to problems in server</p>;
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
