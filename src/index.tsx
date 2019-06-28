import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux'
import {Provider} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import './index.scss'
import theme from './theme'
import {reducer, State} from './stateStorage'
import App from './components/App';
//import Dummy from './components/Dummy'


const initialState:State = {
  items: []
}

ReactDOM.render(
    //<ThemeProvider theme={theme}>
    <Provider store={createStore(reducer, initialState)}>
      <CssBaseline />
      <App/>
    </Provider>
    //</ThemeProvider>
 ,
    document.getElementById('root'));
