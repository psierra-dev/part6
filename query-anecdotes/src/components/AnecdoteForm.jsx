import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnecdote} from "../requests";
import {useContext} from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [_, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log(newAnecdote, "anecdote");
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      dispatch({
        type: "CREATE_ANECDOTE",
        payload: `anecdote '${newAnecdote.content}' created`,
      });

      setTimeout(() => {
        dispatch({
          type: "RESET",
        });
      }, 3000);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: (e) => {
      console.log(e.response.data.error, "error");
      dispatch({
        type: "ERROR_ANECDOTE",
        payload: `${e.response.data.error}`,
      });

      setTimeout(() => {
        dispatch({
          type: "RESET",
        });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const getId = () => (100000 * Math.random()).toFixed(0);
    const content = event.target.anecdote.value;

    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({content, votes: 0, id: getId()});
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
