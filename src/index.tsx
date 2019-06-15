import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss'
import App from './components/App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


library.add(fas, far, fab);
ReactDOM.render(<App />, document.getElementById('root'));
