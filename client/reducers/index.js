import { combineReducers } from 'redux';

import treeDataReducer from './treeDataReducer';

const rootReducer = combineReducers(
    {
        treeData: treeDataReducer,
        
    });

export default rootReducer;