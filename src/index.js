import React from 'react';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import Book from "./Books/Book";
import { render } from 'react-dom';

function StartWebPage(){
    render((

        <Book />
    ), document.getElementById('root'));
}
registerServiceWorker();

StartWebPage();