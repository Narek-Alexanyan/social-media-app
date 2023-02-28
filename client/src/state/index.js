import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authReducer from "./authSlice";
import postReducer from "./postSlice";

import storage from "redux-persist/lib/storage";
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

const authPersistConfig = { key: "auth", storage, version: 1 };
const postPersistConfig = { key: "post", storage, version: 1 };
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  post: persistReducer(postPersistConfig, postReducer)
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);