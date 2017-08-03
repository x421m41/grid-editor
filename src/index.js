import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

injectTapEventPlugin();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const AppContainer = require('./containers/App').default;
    ReactDOM.render(
      <AppContainer store={store}/>,
      document.getElementById('root')
    );
  });
}



registerServiceWorker();
