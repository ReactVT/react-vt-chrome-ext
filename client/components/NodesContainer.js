import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Nodes from './Nodes';

function mapStateToProps({globalColor, selectedColor, selectedItem}) {
  return {
    globalColor,
    selectedItem,
    selectedColor
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const NodesContainer = connect(mapStateToProps, mapDispatchToProps)(Nodes);

export default NodesContainer;