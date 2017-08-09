import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Blocks from './Blocks';



function mapStateToProps(stateIsNowProp) {
    return {
      stateIsNowProp
    }
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  }

const BlocksContainer = connect(mapStateToProps, mapDispatchToProps)(Blocks);

export default BlocksContainer;