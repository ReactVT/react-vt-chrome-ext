import { combineReducers } from 'redux';

import treeDataReducer from './treeDataReducer';
import nodeDataReducer from './nodeDataReducer';
import actionAssertionReducer from './actionAssertionReducer';
import testAssertionReducer from './testAssertionReducer';
import assertionBlockReducer from './assertionBlockReducer';
import assertionListReducer from './assertionListReducer';

const rootReducer = combineReducers(
    {
        treeData: treeDataReducer,
        nodeData: nodeDataReducer,
        actionAssertion: actionAssertionReducer,
        testAssertion: testAssertionReducer,
        assertionBlock: assertionBlockReducer,
        assertionList: assertionListReducer
    });

export default rootReducer;