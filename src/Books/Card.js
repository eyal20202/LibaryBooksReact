import React from 'react'
import $ from "jquery";
import logobook from './Images/book.png';

class Card extends React.Component {
    // Book.volu
    constructor(props) {
        super(props);
        //-----------------------------------------------------------------
        this.state = {
            AuthorName:this.props.New === true? 'Enter Here Author Name':this.props.Data.volumeInfo.authors,
            PublishedDate:this.props.New === true? 'Enter Here Published Date':this.props.Data.volumeInfo.publishedDate,
        BookTitle:this.props.New === true? 'Enter Here Book Title':this.props.Data.volumeInfo.title,
            CardId: this.props.New === true? this.props.CountId :this.props.Data.id,
          GoodDate:false,Save:true, up:'',
            temp:'empty',tempDate:'empty',tempTitle:'empty'
            , ErrorEmpty: true, valid:true , AddNewBook: this.props.New ==true? true: false};

    }
    //-------save----------------------------------------------------------

    handleInputSubmit(e) {

        this.setState({Save: false});



        this.setState({GoodDate:isValidDate(this.state.tempDate)}), () => {
            this.state.GoodDate
        };


        if (EmptyNew(this) && isValidDate(this.state.tempDate)) {

            this.setState({AuthorName: this.state.temp, valid:false});
            this.setState({PublishedDate: this.state.tempDate});
            this.setState({BookTitle:uppercase(removeSpecials(this.state.tempTitle))});
        }

    }
    //-----------cancel------------------------------------------------------

    handleInputCancel(e) {

        this.setState({ temp: this.state.AuthorName});
        this.setState({tempDate:this.state.PublishedDate});
        this.setState({tempTitle:this.state.BookTitle});
        this.setState({GoodDate:false  , Save:true, ErrorEmpty:true ,valid:true})
    }
    //-----------------------form----------------------
    handleChangeBookTitle (e) {

        this.setState({tempTitle: e.target.value, valid:true});


    }
    handleChangePublishedDate (e) {

        this.setState({tempDate: e.target.value, valid:true});


    }
    //-----------------------------------------------------------------

    handleInputChange(e) {
        this.setState({temp: e.target.value, valid:true});
    }
    //-----------------------------------------------------------------

    handlClickEdit(e){

        var card = e.target.parentElement.closest('.card');
        var title = card.querySelector('.Booktitle').innerText;
        var author = card.querySelector('.author').innerText;
        var date = card.querySelector('.date').innerText;

        this.setState({tempTitle:title,
            temp:author,tempDate:date});

    }


    //-----------------------------------------------------------------
    handleRemoveBook(e)
    {

        var el = document.getElementById( this.state.CardId);
        el=el.parentNode;
if(this.props.New==true)
    el=el.parentElement;

        el.parentNode.removeChild( el );

    }

    handleModel()
    {
        return(
            <div className="container">
                <h2> </h2>

                <div className="modal fade" id={'myModal' + this.state.CardId} role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">

                                <h4 className="modal-title ">Edit The Book</h4>
                            </div>
                            <div style={{color:'red',marginTop:'15px'}} hidden={this.state.ErrorEmpty}>* One or More fileds is empty</div>
                            <div className="modal-body form-group”>">

                                <div style={{marginTop:'15px'}}> Author Name </div>
                                <input
                                    className="form-control"
                                    type="text" value={this.state.temp}
                                    onChange={this.handleInputChange.bind(this)}/>

                                <div style={{marginTop:'15px'}}> Published Date  (Format yyyy-mm-dd)</div>
                                <input
                                    className="form-control"
                                    type="text" value={this.state.tempDate}
                                    onChange={this.handleChangePublishedDate.bind(this)}/>
                                <div style={{color:'red'}} hidden={(this.state.GoodDate)||(this.state.Save)}>
                                    * Invaild date plz do like the format yyyy-mm-dd </div>

                                <div style={{marginTop:'15px'}}>Book Title </div>
                                <input
                                    className="form-control"
                                    type="text" value={this.state.tempTitle}
                                    onChange={this.handleChangeBookTitle.bind(this)}/>
                            </div>
                            <div style={{color:'green',margin:'17px'}} hidden={this.state.valid}>The Change Is Saved</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss={this.state.valid==false?"modal":null}

                                        onClick={this.handleInputSubmit.bind(this)}>
                                    {this.state.valid==false? 'Exit' : 'Submit' }
                                </button>

                                <button type="button" className="btn btn-default" data-dismiss="modal"
                                        onClick={this.handleInputCancel.bind(this)}>Close
                                </button>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
//----------------------------------------------------
    render() {
        return (
            <div   >

                <div className="card"  id={this.state.CardId} style={{ padding  : '10px',border:'1px', borderStyle: 'solid',borderRadius: '10px'}}>

                    <button type="button" className="btn btn-info "    style={{borderRadius: '10px',float:'right'}}
                            onClick={ this.handleRemoveBook.bind(this) }>
                        &times;

                    </button>
 <div style={{float:'left'}} >

  <img src={logobook} alt="Book" style={{width:'70%',backgroundSize: 'cover', height: "200px"}}/>


 </div>

                        <span className="card-id" ><span className="glyphicon glyphicon-asterisk blue"></span>
                            <span><span style={{  textDecoration: 'underline'}}> ID:</span>
                                <span style={{  fontWeight: "bold",marginLeft:'5px'}}>{this.state.CardId}</span></span>
                        </span>

                        <hr/>

                    <div >
                        <span class="glyphicon glyphicon-user blue"></span>
                        <span style={{  textDecoration: 'underline'}}>  Author Name:</span>
                        <span className="author" style={{  fontWeight: "bold",marginLeft:'5px'}}>{this.state.AuthorName}</span></div>





                        <hr/>


                    <div><span className="glyphicon glyphicon-edit blue"></span>
                        <span style={{  textDecoration: 'underline'}}> Published Date:</span>
                        <span className="date" style={{fontWeight: "bold",marginLeft:'5px'}}>{this.state.PublishedDate}</span></div>

<hr/>

                    <div><span className="glyphicon glyphicon-book blue"></span>
                        <span style={{  textDecoration: 'underline'}}> Book Title:</span>
                        <span className="Booktitle" style={{fontWeight: "bold",marginLeft:'5px'}}>{this.state.BookTitle}</span></div>

<hr/>
<div>
                <button type="button" className="btn btn-info  " data-toggle="modal" id="newbook"
                        data-target={'#myModal'+ this.state.CardId} onClick={ this.handlClickEdit.bind(this) }
                        style={{borderRadius: '10px',flaot:'left'}}>
                    <span className="glyphicon glyphicon-pencil"></span> Edit The Book
                </button>
                    <button type="button" className="btn btn-info "    style={{borderRadius: '10px',float:'right'}}
                            onClick={ this.handleRemoveBook.bind(this) }>
                        <span className="glyphicon glyphicon-remove"></span> Remove

                    </button>
</div>
                </div>

                {/*Function Model */}
                { this.handleModel(this)}

            </div>
        );
    }
}
//-----------------------------------------------------------------

function EmptyNew(e){
    if (e.state.temp.length == 0 || e.state.tempTitle.length == 0 || e.state.tempDate.length == 0)
    {
        e.setState({ErrorEmpty: false});

        return false
    }
    else{
        e.setState({ErrorEmpty: true});
    return true;
    }
}
//-----------------------------------------------------------------

function isValidDate(dateString)
{


        if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return true;
    return day > 0 && day <= monthLength[month - 1];
};
///==============================================================================================
function uppercase(str)
{
    var array1 = str.split(' ');
    var newarray1 = [];

    for(var x = 0; x < array1.length; x++){
        newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
    }
    return newarray1.join(' ');
}
//-----------------------------------------------------------------

function removeSpecials(str) {
    var lower = str.toLowerCase();
    var upper = str.toUpperCase();

    var res = "";
    for(var i=0; i<lower.length; ++i) {
        if(lower[i] != upper[i] || lower[i].trim() === '')
            res += str[i];
    }
    return res;
}
//-----------------------------------------------------------------

//=================================================================================================
export default Card