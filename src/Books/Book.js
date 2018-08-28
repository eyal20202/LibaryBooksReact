import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';


import  Books from "./Books"
class Book extends Component {


    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">The Books Library </h1>
                </header>


                <Books/>

            </div>
        );
    }

}




export default Book;
