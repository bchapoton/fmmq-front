import React from 'react';
import {Provider} from "react-redux";
import loader from "./reducers/loader.reducer";
import context from "./reducers/context.reducer";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import globalDrawer from "./reducers/global.drawer.reducer";

function MyStoreProvider(props) {
    const {children} = props;

    const rootReducer = combineReducers({
        loader,
        context,
        globalDrawer
    });
    const store = createStore(rootReducer, applyMiddleware(thunk));

    return (<Provider store={store}>{children}</Provider>);
}

export default MyStoreProvider;
