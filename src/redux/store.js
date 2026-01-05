import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlicer";
import classReducer from "./slices/ClassesSlicer";
import studentReducer from "./slices/StudentSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classReducer,
    students: studentReducer,
  },
});