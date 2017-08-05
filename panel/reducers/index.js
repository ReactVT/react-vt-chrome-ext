import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


import posts from './posts';
import comments from './comments';

import treeData from './treeData';
import detailsData from './detailsData';

const rootReducer = combineReducers(
    {
        posts, 
        comments, 
        treeData, 
        detailsData, 
        routing: routerReducer 
        
    });

export default rootReducer;
