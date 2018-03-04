import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import Store from './Store';
import { Provider } from 'react-redux';

const store = Store();

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>, 
document.getElementById('root'));

registerServiceWorker();