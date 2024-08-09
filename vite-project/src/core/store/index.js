import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authSlice from "../slices/authSlice";
import currentUserSlice from "../slices/userSlice"
import postSlice from "../slices/postSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";

// Cấu hình persist
const persistConfig = {
  key: "root",
  storage,
};
const sagaMiddleware = createSagaMiddleware();
// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, authSlice);

// Tạo store với cấu hình middleware
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    current_user : currentUserSlice,
    post:postSlice
  },
  middleware: (getDefaultMiddleware) =>[
    ...getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua kiểm tra tính tuần tự hóa cho các hành động của redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
    sagaMiddleware,
  ]
   
});
sagaMiddleware.run(rootSaga);
// Tạo persistor
export const persistor = persistStore(store);
