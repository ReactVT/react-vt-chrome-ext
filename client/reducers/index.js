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
import searchButtonReducer from './searchButtonReducer.js'
import nodeStoreReducer from './nodeStoreReducer.js';
import testResultsReducer from './testResultsReducer.js'; 
import toggleAssertionBlockReducer from './toggleAssertionBlockReducer.js';
import selectedNodeReducer from './selectedNodeReducer.js';
import globalColorReducer from './globalColorReducer.js';
import selectedColorReducer from './selectedColorReducer.js';
import backgroundConnectionReducer from './backgroundConnectionReducer.js'

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
        toggleAssertion: toggleAssertionBlockReducer, 
        selectedNode: selectedNodeReducer,
        globalColor: globalColorReducer,
        selectedColor: selectedColorReducer,
        searchButton: searchButtonReducer,
        testResults: testResultsReducer, 
        backgroundConnection: backgroundConnectionReducer,
    });

export default rootReducer;