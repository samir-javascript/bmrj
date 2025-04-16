import { combineReducers, configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import cartReducer from '@/lib/store/cartSlice';
import shippingReducer from '@/lib/store/shippingSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import paymentMethodReducer from "@/lib/store/PaymentSlice"

const rootReducer = combineReducers({
  cart: cartReducer,
  shipping: shippingReducer,
  payment: paymentMethodReducer
  // Add other reducers here
});
const persistConfig = {
  key: 'root', // The key for the persisted state in storage
  storage, // The storage engine (localStorage in this case)
  // Optional: Whitelist specific reducers to persist
  // If you only want to persist shipping state, use:
  // whitelist: ['shipping'],
  // Optional: Blacklist specific reducers if you want to persist everything else
  // blacklist: ['counter']
};
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const storeOptions: ConfigureStoreOptions = {
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Important: Ignore these action types from redux-persist
      // to prevent non-serializable value errors in development
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: process.env.NODE_ENV !== 'production', // Keep DevTools config if you had it
};
export const makeStore = () => {
  return configureStore(storeOptions);
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']