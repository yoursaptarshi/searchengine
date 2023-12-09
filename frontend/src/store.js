import {configureStore} from "@reduxjs/toolkit"
import {userReducer}from "./Reducers/user"
import { searchReducer } from "./Reducers/search";

const store = configureStore({
    reducer:{
        user:userReducer,
        search:searchReducer
    },
});

export default store;