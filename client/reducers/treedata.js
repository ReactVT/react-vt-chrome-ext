// DUMMY DATA HERE- DELETE FOR 

import React, { Component } from 'react';
import { tree, hierarchy, select, path, nodes } from 'd3'

import NodesContainer from '../components/NodesContainer';
import Links from '../components/Links';


const treeDataPayload = {
  "name": "App",
  "component": true,
  "state": {
    "rows": [
      [
        "",
        "",
        ""
      ],
      [
        "",
        "",
        ""
      ],
      [
        "",
        "",
        ""
      ]
    ],
    "turn": "X",
    "gameList": [
      {
        "winner": "X",
        "id": 0,
        "createdAt": "2017-06-30T18:19:38.581Z"
      },
      {
        "winner": "X",
        "id": 1,
        "createdAt": "2017-06-30T18:19:38.634Z"
      },
      {
        "winner": "O",
        "id": 2,
        "createdAt": "2017-06-30T18:20:06.597Z"
      },
      {
        "winner": "O",
        "id": 3,
        "createdAt": "2017-06-30T18:20:06.719Z"
      },
      {
        "winner": "O",
        "id": 4,
        "createdAt": "2017-06-30T18:20:07.773Z"
      },
      {
        "winner": "O",
        "id": 5,
        "createdAt": "2017-06-30T18:20:37.108Z"
      },
      {
        "winner": "O",
        "id": 6,
        "createdAt": "2017-07-26T03:20:33.932Z"
      }
    ]
  },
  "address": [
    "root",
    0
  ],
  "children": [
    {
      "children": [
        
      ],
      "debugId": 3,
      "name": "div",
      "component": false,
      "state": null,
      "address": [
        "root",
        0,
        0
      ],
      "props": null
    },
    {
      "children": [
        {
          "children": [
            {
              "children": [
                
              ],
              "debugId": 14,
              "name": "Square",
              "component": true,
              "state": null,
              "props": {
                "row": 0,
                "square": 0,
                "letter": "",
                "handleClick": "function"
              },
              "address": [
                "board",
                0,
                0
              ]
            },
            {
              "children": [
                
              ],
              "debugId": 15,
              "name": "Square",
              "component": true,
              "state": null,
              "props": {
                "row": 0,
                "square": 1,
                "letter": "",
                "handleClick": "function"
              },
              "address": [
                "board",
                0,
                1
              ]
            },
            {
              "children": [
                
              ],
              "debugId": 16,
              "name": "Square",
              "component": true,
              "state": null,
              "props": {
                "row": 0,
                "square": 2,
                "letter": "",
                "handleClick": "function"
              },
              "address": [
                "board",
                0,
                2
              ]
            }
          ],
          "debugId": 10,
          "name": "Row",
          "component": true,
          "state": null,
          "props": {
            "row": 0,
            "letters": [
              "",
              "",
              ""
            ],
            "handleClick": "function"
          },
          "address": [
            "board",
            0
          ]
        },
        {
          "children": [
            {
              "children": [
                
              ],
              "debugId": 21,
              "name": "Square",
              "component": true,
              "state": null,
              "props": {
                "row": 1,
                "square": 0,
                "letter": "",
                "handleClick": "function"
              },
              "address": [
                "board",
                1,
                0
              ]
            },
            {
              "children": [
                
              ],
              "debugId": 22,
              "name": "Square",
              "component": true,
              "state": null,
              "props": {
                "row": 1,
                "square": 1,
                "letter": "",
                "handleClick": "function"
              },
              "address": [
                "board",
                1,
                1
              ]
            },
            {
              "children": [
                
              ],
              "debugId": 23,
              "name": "Square",
              "component": true,
              "state": null,
              "props": {
                "row": 1,
                "square": 2,
                "letter": "",
                "handleClick": "function"
              },
              "address": [
                "board",
                1,
                2
              ]
            }
          ],
          "debugId": 11,
          "name": "Row",
          "component": true,
          "state": null,
          "props": {
            "row": 1,
            "letters": [
              "",
              "",
              ""
            ],
            "handleClick": "function"
          },
          "address": [
            "board",
            1
          ]
        },
        {
          "children": [
            {
              "children": [
                
              ],
              "debugId": 28,
              "name": "Square",
              "component": true,
              "state": null,
              "props": {
                "row": 2,
                "square": 0,
                "letter": "",
                "handleClick": "function"
              },
              "address": [
                "board",
                2,
                0
              ]
            },
            {
              "children": [
                
              ],
              "debugId": 29,
              "name": "Square",
              "component": true,
              "state": null,
              "props": {
                "row": 2,
                "square": 1,
                "letter": "",
                "handleClick": "function"
              },
              "address": [
                "board",
                2,
                1
              ]
            },
            {
              "children": [
                
              ],
              "debugId": 30,
              "name": "Square",
              "component": true,
              "state": null,
              "props": {
                "row": 2,
                "square": 2,
                "letter": "",
                "handleClick": "function"
              },
              "address": [
                "board",
                2,
                2
              ]
            }
          ],
          "debugId": 12,
          "name": "Row",
          "component": true,
          "state": null,
          "props": {
            "row": 2,
            "letters": [
              "",
              "",
              ""
            ],
            "handleClick": "function"
          },
          "address": [
            "board",
            2
          ]
        }
      ],
      "debugId": 4,
      "name": "div",
      "component": false,
      "state": null,
      "address": [
        "board"
      ],
      "props": null
    },
    {
      "children": [
        
      ],
      "debugId": 5,
      "name": "button",
      "component": false,
      "state": null,
      "address": [
        "reset"
      ],
      "props": null
    },
    {
      "children": [
        
      ],
      "debugId": 6,
      "name": "button",
      "component": false,
      "state": null,
      "address": [
        "clear"
      ],
      "props": null
    },
    {
      "children": [
        {
          "children": [
            
          ],
          "debugId": 35,
          "name": "button",
          "component": false,
          "state": null,
          "address": [
            "root",
            0,
            4,
            0
          ],
          "props": null
        },
        {
          "children": [
            
          ],
          "debugId": 36,
          "name": "h3",
          "component": false,
          "state": null,
          "address": [
            "root",
            0,
            4,
            1
          ],
          "props": null
        },
        {
          "children": [
            {
              "children": [
                
              ],
              "debugId": 38,
              "name": "li",
              "component": false,
              "state": null,
              "address": [
                "root",
                0,
                4,
                2,
                0
              ],
              "props": null
            },
            {
              "children": [
                
              ],
              "debugId": 42,
              "name": "li",
              "component": false,
              "state": null,
              "address": [
                "root",
                0,
                4,
                2,
                1
              ],
              "props": null
            },
            {
              "children": [
                
              ],
              "debugId": 46,
              "name": "li",
              "component": false,
              "state": null,
              "address": [
                "root",
                0,
                4,
                2,
                2
              ],
              "props": null
            },
            {
              "children": [
                
              ],
              "debugId": 50,
              "name": "li",
              "component": false,
              "state": null,
              "address": [
                "root",
                0,
                4,
                2,
                3
              ],
              "props": null
            },
            {
              "children": [
                
              ],
              "debugId": 54,
              "name": "li",
              "component": false,
              "state": null,
              "address": [
                "root",
                0,
                4,
                2,
                4
              ],
              "props": null
            },
            {
              "children": [
                
              ],
              "debugId": 58,
              "name": "li",
              "component": false,
              "state": null,
              "address": [
                "root",
                0,
                4,
                2,
                5
              ],
              "props": null
            },
            {
              "children": [
                
              ],
              "debugId": 62,
              "name": "li",
              "component": false,
              "state": null,
              "address": [
                "root",
                0,
                4,
                2,
                6
              ],
              "props": null
            }
          ],
          "debugId": 37,
          "name": "ul",
          "component": false,
          "state": null,
          "address": [
            "root",
            0,
            4,
            2
          ],
          "props": null
        }
      ],
      "debugId": 7,
      "name": "GameList",
      "component": true,
      "state": {
        "text": "first button"
      },
      "props": {
        "gameList": [
          {
            "winner": "X",
            "id": 0,
            "createdAt": "2017-06-30T18:19:38.581Z"
          },
          {
            "winner": "X",
            "id": 1,
            "createdAt": "2017-06-30T18:19:38.634Z"
          },
          {
            "winner": "O",
            "id": 2,
            "createdAt": "2017-06-30T18:20:06.597Z"
          },
          {
            "winner": "O",
            "id": 3,
            "createdAt": "2017-06-30T18:20:06.719Z"
          },
          {
            "winner": "O",
            "id": 4,
            "createdAt": "2017-06-30T18:20:07.773Z"
          },
          {
            "winner": "O",
            "id": 5,
            "createdAt": "2017-06-30T18:20:37.108Z"
          },
          {
            "winner": "O",
            "id": 6,
            "createdAt": "2017-07-26T03:20:33.932Z"
          }
        ]
      },
      "address": [
        "root",
        0,
        4
      ]
    }
  ],
  "debugId": -1
}


function treeData(state = [], action) {
  switch(action.type) {
    case 'GET_TREE_DATA':
      let d3Tree = tree().size([500, 500])(hierarchy(treeDataPayload))
      let nodes = d3Tree.descendants()
      let insertNewItem = [nodeRender(nodes), linkRender(d3Tree,nodes)]
      let updateArray = state.slice()
      updateArray.splice(0,1, insertNewItem)

      return updateArray
    default:
      return state;
  }
}


function nodeRender(nodes) {
  const allTheNodes = [];
      nodes.map(function (d, i) {
        return (allTheNodes.push(<NodesContainer
        xtranslate={d.x}
        ytranslate={d.y}
        key={i}
        name={d.data.name}
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


export default treeData