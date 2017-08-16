


// Helper variables for spacing
const newLine = "\n";
const doubleLine = "\n \n";
const oneSpace = '  '; 
const twoSpace = '    ';
let nodeStore; 

// Initial function call, eventually contains the final result of our test creatinon
function generateTest(list, app, nodestr) {
  nodeStore = nodestr; 
  // If there are no asserts, return. 
  // This should never happen if our frontend works correctly.  
  if (list.length === 0) return; 

  // With valid input, we can start building our result. 
  // First, we start by adding all dependencies
  let result = addDependencies();
  // Then we add our Describe syntax to begin our test  
  result += startDescribe(app);
  // Now we loop through and add each assertion block as an it statement 
  list.forEach(item => {
    result += addBlock(item); 
  }); 
  // After looping we close our describe function and are finished
  result += '});'
  return result; 
}

// Adds any needed dependencies to the top of the file
// TODO - Add mocha? 
function addDependencies() {
  let dependents = `const expect = require('chai').expect;${newLine}`;
  dependents += `import { mount } from 'enzyme';${newLine}`;
  dependents += `import App from 'fill this in with proper path';${doubleLine}`;
  return dependents; 
}

// Starts our test file with an initial describe function that will contain all assertion blocks
function startDescribe(app) {
  let result = `describe('React VT Tests', () => {${newLine}`; 
  result += `${oneSpace}let wrapper;${newLine}`; 
  result += `${oneSpace}beforeEach(() => {${newLine}`; 
  result += `${twoSpace}wrapper = mount<${app} />);${newLine}`; 
  result += `${oneSpace}});${doubleLine}`; 
  return result;   
}

// Builds out an assertion block into an 'it' function
function addBlock(block) {
  let result = `${oneSpace}it('${block.name}', () => {${newLine}`;
  block.asserts.forEach(assert => {
    if (assert.type === 'action') result += addAction(assert);
    else result += addTest(assert); 
  }); 
  return result;  
}

// Custom logic for tests on node addresses, returns full expect line
function nodeTest(assert) { 
  let name = nodeStore.address[assert.loc.toString()].name; 
  let index = nodeStore.address[assert.loc.toString()].index; 
  let result = `${oneSpace}expect(wrapper.find('${name}').at(${index}).props().${assert.property})`;
  result += evalTest(assert); 
  return result;
}

// Builds an expect test
function addTest(assert) {
  
  // State source and node selector logic requires special handling
  if (assert.source === 'state') return stateTest(assert);
  if (assert.selector === 'node') return nodeTest(assert); 
  
  // Logic for doing initial find
  let findMod = '';
  if (assert.selector === 'id') findMod = '#'; 
  if (assert.selector === 'class') findMod = '.';
  let result = `${twoSpace}expect(wrapper.find('${findMod}${assert.selectorName}').`; 
  
  // Selector Mod Logic
  if (assert.selectorModifier === '.length') result += 'length).';
  if (assert.selectorModifier[0] === '[') {
    findMod = assert.selectorModifier.slice(1, -1);
    result += `at(${findMod}).`;
  }

  // Source logic
  if (assert.source) result += sourceTest(assert);
  result += evalTest(assert); 
  return result; 
}

// Once we determine what we are evaulating, eval test builds out the logic for what it's being tested against
function evalTest(assert) {
  let evalVar; 
  if (assert.type === 'equal') evalVar = 'to.equal'; 
  if (assert.type === 'notEqual') evalVar = 'to.not.equal'; 
  if (assert.type === 'greaterthan') evalVar = 'to.be.above';
  if (assert.type === 'lessthan') evalVar = 'to.be.below';
  const expectation = convertType(assert); 
  if (assert.dataType !== 'string') return `${evalVar}(${expectation});${newLine}`;
  return `${evalVar}('${expectation}');${newLine}`;
}

// Converts our expected value into the proper data type, everything starts as a string
function convertType(assert) {
  switch (assert.dataType) {
    case 'boolean':
      return Boolean(assert.value);
    case 'number':
      return +assert.value;
    case 'null':
      return null;
    case 'undefined':
      return undefined;
    case 'string':
      return assert.value; 
    default:
      return 'Data type block failed';
  }
}

// Handles out building source aspect of our expect test
function sourceTest(assert) {
  if (assert.source === 'text') return 'text()).';
  let result;
  if (assert.modifier === '.length') {
    return `props().${assert.property}.length).`;
  }
  if (assert.modifier[0] === '[') {
    return `props().${assert.property}${assert.modifier}).`;
  }
  return `props().${assert.property}).`;
}

// Special handling for state tests
function stateTest(assert) {
  let result = `${twoSpace}wrapper = mount(<${assert.selectorName} />);${newLine}`; 
  if (assert.modifier === '') result += `${twoSpace}expect(wrapper.state().${assert.property}).`; 
  else result += `${twoSpace}expect(wrapper.state().${assert.property}${assert.modifier}).`;
  result += evalTest(assert); 
  return result;  
}

// How we add actions
// TODO - special handling for on-enter? 
function addAction(assert) {
  let result = translateLoc(assert.loc);
  result += `simulate(${assert.event});${newLine}`; 
  return result; 
}

// How we convert our address system to enzyme syntax
function translateLoc(loc) {
  let result = `${twoSpace}wrapper.find('#${loc[0]}').`;
  for (let i = 1; i < loc.length; i++) {
    result += `childAt(${loc[i]}).`; 
  }
  return result; 
}

module.exports = generateTest;

