import React from 'react';
import './index.css';
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker';
import Book from "./Books/Book";
import { render } from 'react-dom';

function StartWebPage(){
    render((

        <Book />
    ), document.getElementById('root'));
}
registerServiceWorker();
 ReactDOM.render(<Book />, document.getElementById('root'));
StartWebPage();