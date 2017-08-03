import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import ReactTree from './ReactTree';

function mapStateToProps(stateIsNowProp) {
  return {
    stateIsNowProp
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(ReactTree);

export default App;
