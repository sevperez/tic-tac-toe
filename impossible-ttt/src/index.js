import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './styles/main.css';
import Root from './components/Root';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
