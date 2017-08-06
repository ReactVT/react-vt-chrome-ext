import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Nodes from './Nodes';

function mapStateToProps(stateIsNowProp) {
  return {
    stateIsNowProp
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const NodesContainer = connect(mapStateToProps, mapDispatchToProps)(Nodes);

export default NodesContainer;