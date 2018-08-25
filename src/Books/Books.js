import React from 'react'
import axios from 'axios';

import Card from "./Card"

class Books extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            SearchBooks: [],
            books:[ ],
            IdNewBook: 0,
            Unikey :'',

        };
        //-----------------------------------------------------------------

        this.handleChange = this.handleChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
    }
    //-----------------------------------------------------------------

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    //-----------------------------------------------------------------

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }
    //-----------------------------------------------------------------

    handleInputChange(e) {
        this.setState({temp: e.target.value});
    }
    //-----------------------------------------------------------------

    handleInputSubmit(e) {
        this.setState({value: e.target.value});

        let that = this;
        axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: this.state.value
            }
        })

            .then(function (response) {
                // data.items[]

                that.setState({
                    SearchBooks: response.data.items
                });
                let arr = [];


                    if(!that.state.SearchBooks)
                        return;
                    that.state.SearchBooks.forEach(function (book, index) {

                        {
                            arr.push(<div  class="col-md-10" style={{paddingLeft:'0px'}} >
                                {
                                    <Card key={index} New={false} Data={book} />


                                }
                            </div>)
                        }


                    });

                arr.push(that.state.books);
                that.setState({books:arr});

            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //-----------------------------------------------------------------

    handleAddBook(e){
        let that = this;

        let arr = [];
        {
            arr.push(<div  class="col-md-10" style={{paddingLeft:'0px'}}>
                {

                    <div class="parent">
                        <Card  New={true} key={this.state.IdNewBook} CountId={this.state.IdNewBook} />
                    </div>
                }
            </div>)
        }

        this.setState({ IdNewBook: this.state.IdNewBook + 1 });

        arr.push(this.state.books);

        this.setState({books:arr});
    }
    //-----------------------------------------------------------------

    render() {
        return (
            <div className="col-md-offset-2 col-md-9">
                <div className="search ">
                    <div className="col-md-7">
                    <input  type="search" class="form-control  serachBook " value={this.state.value}  onChange={this.handleChange}
                           placeholder="Search Here Books" />
                    </div>
                        <div className="col-md-4">
                    <button class="btn btn-primary " type="button" onClick={this.handleInputSubmit.bind(this)}
                            > <span className="glyphicon glyphicon-search"></span> Search</button>

                    <button class="btn btn-primary" type="button"  onClick={this.handleAddBook.bind(this)}
                            style={{ marginLeft:'10px'}} > <span className="glyphicon glyphicon-plus"></span>Add A New Book


                        </button>
                    </div>

            </div>

                <div className="results"  style={{marginTop:'50px'}}>

                    {this.state.books}

                </div>

            </div>
        );
    }
}
///==============================================================================================
export default Books