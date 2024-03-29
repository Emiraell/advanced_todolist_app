import { configureStore } from "@reduxjs/toolkit";
import { userNameSlice } from "./features/userNameSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TaskSlice } from "./features/Tasks";
import { notificationSlice } from "./features/notificationSlice";

export const store = configureStore({
  reducer: {
    // all reducers
    userNameReducer: userNameSlice.reducer,
    taskReducer: TaskSlice.reducer,
    notificationReducer: notificationSlice.reducer,
  },
});

// Changing or performing an action to change the initial state
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
// Read the state in the redux
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
