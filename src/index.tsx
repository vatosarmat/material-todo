import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { createStore} from 'redux'
import {Provider} from 'react-redux'

import './index.scss'
import {reducer, State} from './stateStorage'
import App from './components/App';
import Dummy from './components/Dummy'

const initialState:State = {
  items: []
}

library.add(fas, far, fab);
ReactDOM.render(
    <Provider store={createStore(reducer, initialState)}>
      <App/>
    </Provider>,
    document.getElementById('root'));


// ReactDOM.render(
//     <Dummy/>,
//     document.getElementById('root'));
