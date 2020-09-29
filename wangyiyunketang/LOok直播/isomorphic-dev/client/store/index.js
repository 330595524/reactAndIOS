import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import models from '../models';

// combineReducers({
//     Home: homeReducer,
//     Livelist: listReducer
// });
// model
class Model {
    constructor(model, key) {
        const { state, epics, reducers } = model;
        this.initState = state;
        this.key = key;
        this.reducers = {};
        Object.keys(epics).forEach((item) => {
            this[item] = this.transEpic(epics[item].bind(this));
        });
        Object.keys(reducers).forEach((item) => {
            this[item] = this.transReducer(item);
            this.reducers[item] = reducers[item].bind(this);
        });
    }

    transEpic = func => (payload, dispatch) => {
        this.dispatch = dispatch;
        return func(payload, dispatch);
    }

    transReducer = item => (payload) => {
        this.dispatch({
            payload,
            type: `${this.key}/${item}`
        });
    }

    getReducers = (state, action) => {
        const realState = state || this.initState;
        const { type, payload } = action;
        const types = type.split('/');
        if (types[0] === this.key) {
            const cur = types[1];
            const func = this.reducers[cur];
            return func ? func(realState, payload) : realState;
        }
        return realState;
    }
}
// 处理 models
const disModels = (ms) => {
    const obj = {};
    Object.keys(ms).forEach((item) => {
        obj[item] = new Model(ms[item], item);
    });
    return obj;
};

const configureStore = (preloadedState = {}) => {
    const transModels = disModels(models);

    // middleware，支持 dispatch('key/method')
    const newthunk = ({ dispatch, getState }) => next => (action, args) => {
        const actions = typeof action === 'string' && action.indexOf('/') > -1
            ? action.split('/')
            : action;
        if (Array.isArray(actions)) {
            return transModels[actions[0]][actions[1]](args, dispatch);
        }
        return next(action);
    };

    // new reducers
    const res = {};
    Object.keys(transModels).forEach((item) => {
        res[item] = transModels[item].getReducers;
    });
    const newreduce = combineReducers(res);
    const applyMiddleFuncs = [newthunk];
    if (process.env.NODE_ENV === 'development') {
        applyMiddleFuncs.push(logger);
    }
    const store = createStore(newreduce, preloadedState, applyMiddleware(...applyMiddleFuncs));
    return store;
};
export default configureStore;