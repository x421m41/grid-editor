import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import App from './containers/App';

const store = createStore(reducer);

injectTapEventPlugin();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
