import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux'
import {Provider} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import {slug} from 'cuid'

import theme from './theme'
import {reducer, State} from './stateStorage'
import App from './components/App';
//import Dummy from './components/Dummy'


const initialState:State = {
  items: [
    {
      id: 'item_'+slug(),
      title: 'Go to doctor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, pariatur, ullam.',
      done: false
    },
    {
      id: 'item_'+slug(),
      title: 'Buy some food for breakfast',
      description: 'Aliquid at ducimus ipsum quod totam ut vitae voluptatem.',
      done: false
    },
    {
      id: 'item_'+slug(),
      title: 'Fix the car',
      description: 'Accusamus autem deleniti dolore dolores, expedita illo inventore ipsam, ' +
          'ipsum libero maiores necessitatibus nesciunt non obcaecati optio provident reprehenderit vel, veniam voluptatem.',
      done: false
    },
    {
      id: 'item_'+slug(),
      title: 'Clean the apartment',
      done: false
    }
  ]
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
