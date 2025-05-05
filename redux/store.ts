import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import talentSlice from "./slices/talentSlice";
import companySlice from "./slices/companySlice";
import notificationSlice from "./slices/notificationSlice";
import jobSlice from "./slices/jobSlice";
import companyJobsSlice from "./slices/companyJobsSlice";
import applicationSlice from "./slices/applicationSlice";
import blogPostSlice from "./slices/blogPostslice";
import reviewSlice from "./slices/reviewSlice";
import faqSlice from "./slices/faqSlice";
import filterSlice from "./slices/filterSlice";
import adminSlice from "./slices/adminSlice";
import successApplicantsSlice from "./slices/successAplicantsSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine all your reducers into a root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  talent: talentSlice,
  company: companySlice,
  notification: notificationSlice,
  job: jobSlice,
  companyJobs: companyJobsSlice,
  application: applicationSlice,
  blogPost: blogPostSlice,
  review: reviewSlice,
  faq: faqSlice,
  filters: filterSlice,
  admin: adminSlice,
  successApplicants: successApplicantsSlice,
});

// Persisting the combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Creating persistor to persist the store
export const persistor = persistStore(store);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
