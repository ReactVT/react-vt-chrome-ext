import * as actionCreators from '../actions/actionCreators';
import selectedItemReducer from '../reducers/selectedItemReducer.js';
import testReducer from '../reducers/testReducer';
import treeDataReducer from '../reducers/treeDataReducer';
import nodeDataReducer from '../reducers/nodeDataReducer';
import actionReducer from '../reducers/actionReducer';
import testModeReducer from '../reducers/testModeReducer';
import assertionBlockReducer from '../reducers/assertionBlockReducer';
import assertionListReducer from '../reducers/assertionListReducer';
import viewModeReducer from '../reducers/viewModeReducer';
import assertIDReducer from '../reducers/assertIDReducer.js';
import searchButtonReducer from '../reducers/searchButtonReducer.js'
import nodeStoreReducer from '../reducers/nodeStoreReducer.js';
import testResultsReducer from '../reducers/testResultsReducer.js'; 
import toggleAssertionBlockReducer from '../reducers/toggleAssertionBlockReducer.js';
import globalColorReducer from '../reducers/globalColorReducer.js';
import selectedColorReducer from '../reducers/selectedColorReducer.js';
import backgroundConnectionReducer from '../reducers/backgroundConnectionReducer.js';
import firstLoadReducer from '../reducers/firstLoadReducer.js';
import appNameReducer from '../reducers/appNameReducer.js';
import errorReducer from '../reducers/errorReducer.js';

describe('selectedItemReducer', () => {
  it('should return the initial state', () => {
    expect(selectedItemReducer(undefined, {})).toEqual(
      {type: 'none', node: null, assert: {}, debugId: null}
    )
  })
})

describe('selectedItemReducer', () => {
  it('should return a selected action state', () => {
    expect(selectedItemReducer(undefined, {type: 'SELECTED_ACTION', payload: {'test':'test'}})).toEqual(
      {type: 'action', node: null, assert: {'test':'test'}}
    )
  })
})

describe('selectedItemReducer', () => {
  it('should return a selected test state', () => {
    expect(selectedItemReducer(undefined, {type: 'SELECTED_TEST', payload: {'test':'test'}})).toEqual(
      {type: 'test', node: null, assert: {'test':'test'}}
    )
  })
})

describe('selectedItemReducer', () => {
  it('should remove selected node', () => {
    expect(selectedItemReducer(undefined, {type: 'REMOVE_SELECTED_NODE'})).toEqual(
      {type: 'none', node: null, assert: {}, debugId: null}
    )
  })
})

describe('selectedItemReducer', () => {
  it('should return the a selected node state', () => {
    expect(selectedItemReducer(undefined, {type: 'SELECTED_NODE', debugId: 1, payload: {'test':'test'} })).toEqual(
      {type: 'node', node: {'test':'test'}, assert: {}, debugId: 1}
    )
  })
})


describe('nodeDataReducer', () => {
  it('should return the initial state for nodeDataReducer', () => {
    expect(nodeDataReducer(undefined, {})).toEqual({'state': null, 'props': null, 'address': null, 'name': null, 'debugId': null})
  })
})


describe('nodeDataReducer', () => {
  it('should return the node data state', () => {
    expect(nodeDataReducer(undefined, {type: 'GET_NODE_DATA', payload: {'state': {'test':'test'}, 'props': {'test':'test'}, 'address': {'test':'test'}, 'name': 'test', 'debugId': 1} })).toEqual({'state': {'test':'test'}, 'props': {'test':'test'}, 'address': {'test':'test'}, 'name': 'test', 'debugId': 1})
  })
})


describe('testReducer', () => {
  it('should return the initial state for testReducer', () => {
    expect(testReducer(undefined, {})).toEqual({assertID: 0, type: '', selector: '', selectorName: '', selectorModifier: '', source: '', property: '', modifier: '', value: '', dataType: '', compName: '', loc: [], passed: ''})
  })
})

describe('testReducer', () => {
  it('should return the old state', () => {
    expect(testReducer(undefined, {type: 'CLEAR_TEST'})).toEqual({assertID: 0, type: '', selector: '', selectorName: '', selectorModifier: '', source: '', property: '', modifier: '', value: '', dataType: '', compName: '', loc: [], passed: ''})
  })
})

describe('testResultsReducer', () => {
  it('should return the initial state for testResultsReducer', () => {
    expect(testResultsReducer(undefined, {})).toEqual(
      {assertionBlock: '', assertID: '', expected: '', comparator: '', actual: '', result: ''}
    )
  })
})

describe('toggleAssertionBlockReducer', () => {
  it('should return the initial state for toggleAssertionBlockReducer', () => {
    expect(toggleAssertionBlockReducer(undefined, {})).toEqual(false)
  })
})

describe('treeDataReducer', () => {
  it('should return the initial state for treeDataReducer', () => {
    expect(treeDataReducer(undefined, {})).toEqual([])
  })
})

describe('viewModeReducer', () => {
  it('should return the initial state for viewModeReducer', () => {
    expect(viewModeReducer(undefined, {})).toEqual('viewBlocks')
  })
})

describe('actionReducer', () => {
  it('should return the initial state for actionReducer', () => {
    expect(actionReducer(undefined, {})).toEqual({ assertID: 0, type: 'action', event: 'click', compName: '', loc: [], inputValue: '', passed: '' })
  })
})

describe('appNameReducer', () => {
  it('should return the initial state for appNameReducer', () => {
    expect(appNameReducer(undefined, {})).toEqual('')
  })
})

describe('assertIDReducer', () => {
  it('should return the initial state for assertIDReducer', () => {
    expect(assertIDReducer(undefined, {})).toEqual(1)
  })
})

describe('assertionBlockReducer', () => {
  it('should return the initial state for assertionBlockReducer', () => {
    expect(assertionBlockReducer(undefined, {})).toEqual({ name: '', passed: '', asserts: [] })
  })
})

describe('assertionListReducer', () => {
  it('should return the initial state for assertionListReducer', () => {
    expect(assertionListReducer(undefined, {})).toEqual([])
  })
})

describe('backgroundConnectionReducer', () => {
  it('should return the initial state for backgroundConnectionReducer', () => {
    expect(backgroundConnectionReducer(undefined, {})).toEqual(null)
  })
})

describe('testModeReducer', () => {
  it('should return the initial state for testModeReducer', () => {
    expect(testModeReducer(undefined, {})).toEqual(
      'test1'
    )
  })
})

describe('errorReducer', () => {
  it('should return the initial state for errorReducer', () => {
    expect(errorReducer(undefined, {})).toEqual(false)
  })
})

describe('firstLoadReducer', () => {
  it('should return the initial state for firstLoadReducer', () => {
    expect(firstLoadReducer(undefined, {})).toEqual(false)
  })
})

describe('globalColorReducer', () => {
  it('should return the initial state for globalColorReducer', () => {
    expect(globalColorReducer(undefined, {})).toEqual({'fill': '#fff', 'stroke': 'steelblue', 'strokeWidth': '4px'})
  })
})

describe('nodeStoreReducer', () => {
  it('should return the initial state for nodeStoreReducer', () => {
    expect(nodeStoreReducer(undefined, {})).toEqual({address: {}, id: {}, class: {}, node: {}, tag: {}})
  })
})

describe('searchButtonReducer', () => {
  it('should return the initial state for searchButtonReducer', () => {
    expect(searchButtonReducer(undefined, {})).toEqual([])
  })
})

describe('selectedColorReducer', () => {
  it('should return the initial state for selectedColorReducer', () => {
    expect(selectedColorReducer(undefined, {})).toEqual({'fill': 'ff5e55', 'stroke': 'steelblue', 'strokeWidth': '4px'})
  })
})


const payload = {"test": "test"}
const store = {"test": "test"}
const name = "test"
const id = 1
const result = {"test": "test"}
const actual = {"test": "test"}
const debugId = 1
const property = {"test": "test"}
const value = {"test": "test"}
const location = {"test": "test"}

describe('actions', () => {
  it('should create an action to load tree data', () => {
    const expectedAction = {
      type: "LOAD_TREE_DATA",
      payload
    }
    expect(actionCreators.loadTreeData(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to load app name', () => {
    const expectedAction = {
      type: "SET_APP_NAME",
      payload
    }
    expect(actionCreators.setAppName(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to create background connection', () => {
    const expectedAction = {
      type: "SET_BACKGROUND_CONNECTION",
      payload
    }
    expect(actionCreators.setBackgroundConnection(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to load node store', () => {
    const expectedAction = {
      type: "LOAD_NODESTORE_DATA",
      store
    }
    expect(actionCreators.loadNodeStore(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to load results', () => {
    const expectedAction = {
      type: "LOAD_RESULTS",
      payload
    }
    expect(actionCreators.loadResults(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to clear results', () => {
    const expectedAction = {
      type: "CLEAR_RESULTS",
    }
    expect(actionCreators.clearResults()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action for first load', () => {
    const expectedAction = {
      type: "FIRST_LOAD",
    }
    expect(actionCreators.firstLoad()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action for when it is not first load', () => {
    const expectedAction = {
      type: "NOT_FIRST_LOAD",
    }
    expect(actionCreators.notFirstLoad()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to save result to block', () => {
    const expectedAction = {
      type: "SAVE_RESULT_TO_BLOCK",
      name,
      id,
      result,
      actual
    }
    expect(actionCreators.saveResultToBlock(name, id, result, actual)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to get node data', () => {
    const expectedAction = {
      type: "GET_NODE_DATA",
      payload
    }
    expect(actionCreators.getNodeData(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to select node', () => {
    const expectedAction = {
      type: "SELECTED_NODE",
      payload,
      debugId
    }
    expect(actionCreators.selectedNode(payload, debugId)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to remove selected node', () => {
    const expectedAction = {
      type: "REMOVE_SELECTED_NODE",
    }
    expect(actionCreators.removeSelectedNode()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to select an action', () => {
    const expectedAction = {
      type: "SELECTED_ACTION",
      payload
    }
    expect(actionCreators.selectedAction(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to select a test', () => {
    const expectedAction = {
      type: "SELECTED_TEST",
      payload
    }
    expect(actionCreators.selectedTest(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to save an action', () => {
    const expectedAction = {
      type: "SAVE_ACTION_PROPERTY",
      property,
      value
    }
    expect(actionCreators.saveActionProperty(property, value)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to set an action location', () => {
    const expectedAction = {
      type: "SET_ACTION_LOCATION",
      location
    }
    expect(actionCreators.setActionLocation(location)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to clear an action', () => {
    const expectedAction = {
      type: "CLEAR_ACTION"
    }
    expect(actionCreators.clearAction()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to save test property', () => {
    const expectedAction = {
      type: "SAVE_TEST_PROPERTY",
      property,
      value
    }
    expect(actionCreators.saveTestProperty(property, value)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to set a test location', () => {
    const expectedAction = {
      type: "SET_TEST_LOCATION",
      location
    }
    expect(actionCreators.setTestLocation(location)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to clear test', () => {
    const expectedAction = {
      type: "CLEAR_TEST"
    }
    expect(actionCreators.clearTest()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to save assertion', () => {
    const expectedAction = {
      type: "SAVE_ASSERTION",
      payload
    }
    expect(actionCreators.saveAssertion(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to delete assertion', () => {
    const expectedAction = {
      type: "DELETE_ASSERTION",
      id
    }
    expect(actionCreators.deleteAssertion(id)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to create a new assertion block', () => {
    const expectedAction = {
      type: "NEW_ASSERTION_BLOCK",
      name
    }
    expect(actionCreators.newAssertionBlock(name)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to save an assertion block', () => {
    const expectedAction = {
      type: "SAVE_ASSERTION_BLOCK",
      payload
    }
    expect(actionCreators.saveAssertionBlock(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to toggle an assertion block', () => {
    const expectedAction = {
      type: "NEW_ASSERTION_BLOCK_TOGGLE"
    }
    expect(actionCreators.toggleAssertionBlock()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to delete a new assertion block', () => {
    const expectedAction = {
      type: "DELETE_ASSERTION_BLOCK",
      name
    }
    expect(actionCreators.deleteAssertionBlock(name)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to add an assertion to list', () => {
    const expectedAction = {
      type: "ADD_ASSERTION_TO_LIST",
      payload
    }
    expect(actionCreators.addAssertionToList(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to delete an assertion from list', () => {
    const expectedAction = {
      type: "DELETE_ASSERTION_LIST",
      payload
    }
    expect(actionCreators.deleteAssertionList(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to load an assertion from list', () => {
    const expectedAction = {
      type: "LOAD_ASSERTION_LIST",
      payload
    }
    expect(actionCreators.loadAssertionList(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to clear results from assertion list', () => {
    const expectedAction = {
      type: "CLEAR_RESULTS_FROM_LIST"
    }
    expect(actionCreators.clearResultsFromList()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to render block edit', () => {
    const expectedAction = {
      type: "RENDER_EDIT_BLOCK"
    }
    expect(actionCreators.renderEditMode()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to render action menu', () => {
    const expectedAction = {
      type: "RENDER_ACTION_MENU"
    }
    expect(actionCreators.renderActionMode()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to render test menu', () => {
    const expectedAction = {
      type: "RENDER_TEST_MENU"
    }
    expect(actionCreators.renderTestMode()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to render view blocks', () => {
    const expectedAction = {
      type: "RENDER_VIEW_BLOCKS"
    }
    expect(actionCreators.renderViewMode()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to render name assertion mode', () => {
    const expectedAction = {
      type: "RENDER_ASSERTION_NAME_MODE"
    }
    expect(actionCreators.renderNameAssertionMode()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to render test 1', () => {
    const expectedAction = {
      type: "RENDER_TEST1_MODE"
    }
    expect(actionCreators.renderTest1()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to render test 2', () => {
    const expectedAction = {
      type: "RENDER_TEST2_MODE"
    }
    expect(actionCreators.renderTest2()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to render test 3', () => {
    const expectedAction = {
      type: "RENDER_TEST3_MODE"
    }
    expect(actionCreators.renderTest3()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to increment assert id', () => {
    const expectedAction = {
      type: "INCREMENT_ASSERT_ID"
    }
    expect(actionCreators.incrementAssertId()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to reset assert id', () => {
    const expectedAction = {
      type: "RESET_ASSERT_ID"
    }
    expect(actionCreators.resetAssertId()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to create search buttons', () => {
    const expectedAction = {
      type: "SEARCH_BUTTON",
      payload
    }
    expect(actionCreators.createSearchButtons(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action when there is no data', () => {
    const expectedAction = {
      type: "NO_DATA",
    }
    expect(actionCreators.noData()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action when the application to be tested has react router', () => {
    const expectedAction = {
      type: "REACT_ROUTER"
    }
    expect(actionCreators.reactRouter()).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action when there is no error', () => {
    const expectedAction = {
      type: "NO_ERROR",
    }
    expect(actionCreators.noError()).toEqual(expectedAction)
  })
})
