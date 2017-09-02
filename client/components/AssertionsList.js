import React, { Component } from 'react';
import { render } from 'react-dom';
import generateTest from './../enzyme/enzymeTranslate'
import { Button, Accordion, Icon, List } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

const mapStateToProps = store => ({
  assertionList: store.assertionList, 
  appName: store.appName,
  nodeStore: store.nodeStore,  
  backgroundConnection: store.backgroundConnection, 
});


const mapDispatchToProps = (dispatch) => ({

  renderNameAssertionMode: () => {
    dispatch(actionCreators.renderNameAssertionMode());
  },
  deleteAssertionBlock: () => {
    dispatch(actionCreators.deleteAssertionBlock());
  },
  selectedTest: () => {
    dispatch(actionCreators.selectedTest());
  },
  selectedAction: () => {
    dispatch(actionCreators.selectedAction());
  },
});

class AssertionsList extends Component {
  
  handleNewAssertionBlock() {
    this.props.renderNameAssertionMode();
  }

  handleDelete(e, name) {
    // Stops event from propegating to parents
    e.stopPropagation();
    this.props.deleteAssertionBlock(name);
    this.props.backgroundConnection.postMessage({
        type: 'assertion',
        message: name, 
        flag: 'delete'
      });
  }

  handleAssertDetailAction(assert) {
    this.props.selectedAction(assert);

  }

  handleAssertDetailTest(assert) {
    this.props.selectedTest(assert);
  }

  // Hacky method of doing enzyme downloads on the fly
  saveEnzyme() {
    let text = generateTest(this.props.assertionList, this.props.appName, this.props.nodeStore);
    const data = new Blob([text], {type: 'text/plain'});
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    const textFile = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.setAttribute('download', 'enzymeTest.js');
    link.href = textFile; 
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      const event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
  }

  render() {
    let assertionlist = [];
    let listArray = this.props.assertionList;
    if (listArray.length > 0) {
      listArray.forEach((block, i) => {
        const assertText = [];
        let styling;
        // Block pass/fail status
        if (block.passed === true) styling = 'accordion-pass';
        else if (block.passed === false) styling = 'accordion-fail';
        else styling = 'accordion-block';

        assertionlist.push(
            <Accordion.Title style={{'background': '#98AEC8'}} className={styling}>
              <Icon name='dropdown' />
              { block.name } 
              <Icon name='delete' style={{'float': 'right'}} onClick={(e) => this.handleDelete(e, block.name)} />
            </Accordion.Title>);
        // loop through all asserts in block
        block.asserts.forEach((assertion, i)=> {
          let passFailIcon;
          let comparator;
          let classOrId;
          // Pass/Fail status of assertion
          if (assertion.passed === true) 
            if (assertion.type === 'action') passFailIcon = ( <List.Icon className="result-icon" name="arrow right" color='blue' /> );
            else passFailIcon = ( <List.Icon className="result-icon" name="checkmark" color='green' /> );
          else if (assertion.passed === false) passFailIcon = (<List.Icon className="result-icon" name="x" color='red' />);
          // Comparator
          if (assertion.type === 'equal') {
            comparator = ('to equal');
          } else if (assertion.type === 'greaterthan') {
            comparator = ('to be greater than');
          } else if (assertion.type === 'lessthan') {
            comparator = ('to be less than');
          } else if (assertion.type === 'notequal') {
            comparator = ('to not equal');
          }

          // ID or class
          if (assertion.selector === 'id') classOrId = ('#');
          else if (assertion.selector === 'class') classOrId = ('.');

          // Action/Test
          if (assertion.type === 'action') {
            assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailAction(assertion)} >{ passFailIcon }ID{assertion.assertID} Action: {assertion.event} on {assertion.compName}</div>);
          } else {
            // component
            if (assertion.selector === 'component') {
            assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailTest(assertion)}>{ passFailIcon }ID{assertion.assertID} Expect {assertion.selector} {assertion.selectorName} {comparator} {assertion.value}</div>);
            } else if (assertion.selector === 'id' || assertion.selector === 'class') {
              // class or id
              assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailTest(assertion)}>{ passFailIcon }ID{assertion.assertID} Expect {classOrId}{assertion.selectorName} {comparator} {assertion.value}</div>);
            } else if (assertion.selector === 'node') {
              // node
              assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailTest(assertion)}>{ passFailIcon }ID{assertion.assertID} Expect {assertion.compName} {assertion.source} {comparator} '{assertion.value}'</div>);
            } else {
              // tags
              assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailTest(assertion)}>{ passFailIcon }ID{assertion.assertID} Expect {assertion.selectorName} {comparator} {assertion.value}</div>);
            }
          }
        });
        assertionlist.push(
          <Accordion.Content className="accordion-content">
            {assertText}
          </Accordion.Content>
        );
      });
    }  
      return (
        <div>
          <div className='button-container'>
            <Button inverted color="yellow" primary size='mini' className="btn btn-primary new" onClick={()=>this.handleNewAssertionBlock()}> New Assertion Block</Button>
            <Button inverted color="yellow" primary size='mini' type="button" className="btn btn-primary new" onClick={()=>this.saveEnzyme()}> Export to Enzyme</Button>
          </div>
          <div className="accordion-container">
            <Accordion styled>
              { assertionlist }
            </Accordion>
          </div>
        </div>

      )
    }
    
};

export default connect(mapStateToProps, mapDispatchToProps)(AssertionsList);
