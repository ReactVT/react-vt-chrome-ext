import React, { Component } from 'react';
import { tree, hierarchy } from 'd3'
import NodesContainer from '../components/NodesContainer';
import Links from '../components/Links';

function treeDataReducer(state = [], action) {
  switch(action.type) {
    case 'LOAD_TREE_DATA':
      let d3Tree = tree().nodeSize([40, 180])(hierarchy(action.payload))
      let nodes = d3Tree.descendants()
      let insertNewItem = [nodeRender(nodes), linkRender(d3Tree,nodes)]
      let updateArray = state.slice()
      updateArray.splice(0,1, insertNewItem)
      return updateArray
    default:
      return state;
  }
}

export default treeDataReducer;


function nodeRender(nodes) {
  const allTheNodes = [];
      nodes.map(function (d, i) {
        return (allTheNodes.push(<NodesContainer
        xtranslate={d.x}
        ytranslate={d.y}
        key={i}
        name={d.data.name}
        id={d.data.id}
        class={d.data.class}
        props={d.data.props}
        state={d.data.state}
        address={d.data.address}
        debugId={d.data.debugId}
        children={d.data.children}
        parent={d.data.parent}
      />)) 
      })
  return allTheNodes
}

function linkRender(d3Tree,nodes){
      const linksArr = d3Tree.links(nodes);
      const allTheLinks = []
      linksArr.map(function (link, index) {
        return (allTheLinks.push(<Links datum={link} key={index} />))
      })

      return allTheLinks
}   

