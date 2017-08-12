import { combineReducers } from 'redux';

import treeDataReducer from './treeDataReducer';
import nodeDataReducer from './nodeDataReducer';
import actionReducer from './actionReducer';
import testReducer from './testReducer';
import testModeReducer from './testModeReducer';
import assertionBlockReducer from './assertionBlockReducer';
import assertionListReducer from './assertionListReducer';
import viewModeReducer from './viewModeReducer';
import assertIDReducer from './assertIDReducer.js';
import nodeStoreReducer from './nodeStoreReducer.js'; 
import toggleAssertionBlockReducer from './toggleAssertionBlockReducer.js'


const rootReducer = combineReducers(
    {
        treeData: treeDataReducer,
        nodeData: nodeDataReducer,
        action: actionReducer,
        assertID: assertIDReducer,
        test: testReducer,
        assertionBlock: assertionBlockReducer,
        assertionList: assertionListReducer,
        viewMode: viewModeReducer,
        testMode: testModeReducer,
        nodeStore: nodeStoreReducer,
        toggleAssertion: toggleAssertionBlockReducer
    });

export default rootReducer;