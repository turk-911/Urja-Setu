import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import eventReducer from './eventSlice'
import orderReducer from './orderSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)
const persistedProductReducer = persistReducer(persistConfig, productReducer)
const persistedCartReducer = persistReducer(persistConfig, cartReducer)
const persistedEventReducer = persistReducer(persistConfig, eventReducer)
const persistedOrderReducer = persistReducer(persistConfig, orderReducer)


const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    product: persistedProductReducer,
    cart: persistedCartReducer,
    event: persistedEventReducer,
    order: persistedOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['payload.date'],
      },
    }),
});


const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export { store, persistor }
