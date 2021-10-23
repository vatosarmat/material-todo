import ReactDOM from 'react-dom'
import { createStore, AnyAction, Reducer, Store, CombinedState } from 'redux'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { slug } from 'cuid'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer, { State } from 'stateStorage'
import App from './components/App'
//import Dummy from './components/Dummy'

const pConfig = {
  key: 'root',
  storage
}

const pReducer = persistReducer(pConfig, reducer)

const demoItems = [
  {
    id: 'item_' + slug(),
    title: 'Go to doctor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, pariatur, ullam.',
    done: false
  },
  {
    id: 'item_' + slug(),
    title: 'Buy some food for breakfast',
    description: 'Aliquid at ducimus ipsum quod totam ut vitae voluptatem.',
    done: false
  },
  {
    id: 'item_' + slug(),
    title: 'Fix the car',
    description:
      'Accusamus autem deleniti dolore dolores, expedita illo inventore ipsam, ' +
      'ipsum libero maiores necessitatibus nesciunt non obcaecati optio provident reprehenderit vel, veniam voluptatem.',
    done: false
  },
  {
    id: 'item_' + slug(),
    title: 'Clean the apartment',
    done: false
  }
]

type StateFromReducer<T> = T extends Reducer<infer S, any> ? S : never

const store = createStore(
  pReducer,
  {
    items: demoItems.reduce(
      (dict, item) => ({
        ...dict,
        [item.id]: item
      }),
      {}
    )
  } as CombinedState<StateFromReducer<typeof pReducer>>,
  composeWithDevTools()
)
const persistor = persistStore(store as unknown as Store<State, AnyAction>)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssBaseline />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
