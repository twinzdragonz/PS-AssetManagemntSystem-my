import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Loginscreen from './loginscreen.js';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Loginscreen />, document.getElementById('root'));


// Default
//ReactDOM.render(<App />, document.getElementById('root2'));






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
