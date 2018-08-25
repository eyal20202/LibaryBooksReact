import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import Card from "./Card";

import  Books from "./Books"
class Book extends Component {


    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">The Books Library </h1>
                </header>

                <p className="App-intro">
                    <div ref={el => (this.instance = el)} />

                </p>


                <Books/>

            </div>
        );
    }

}




export default Book;
