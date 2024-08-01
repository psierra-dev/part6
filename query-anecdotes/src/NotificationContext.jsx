import {createContext, useReducer} from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_ANECDOTE":
      return action.payload;
    case "RESET":
      return "";
    case "VOTE_ANECDOTE":
      return action.payload;
    case "ERROR_ANECDOTE":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
