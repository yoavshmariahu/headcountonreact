import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }


  render() {
      return (
        <div className="App">
            <h1>Contact Me</h1>
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <label>Full Name</label>
                    <input type="text" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} placeholder="Your name.." />

                    <label>Email Address</label>
                    <input type="email" id="email" name="email" value={this.state.email} onChange={this.onEmailChange.bind(this)} placeholder="Your email" />


                    <label>Message</label>
                    <textarea id="message" name="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} placeholder="Write something.."></textarea>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
  );
  }

  onNameChange(event) {
	this.setState({name: event.target.value})
  }

  onEmailChange(event) {
	this.setState({email: event.target.value})
  }

  onMessageChange(event) {
	this.setState({message: event.target.value})
  }

  resetForm(){

     this.setState({name: '', email: '', message: ''})
  }

  handleSubmit(event) {
        event.preventDefault();
    fetch('https://headcount.pythonanywhere.com/send-email', {
        method: 'POST',
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        body: JSON.stringify({'user': '10sfull', 'pwd': 'half-cap-pppoker', 'address': this.state.email, 'name': this.state.name, 'message': this.state.message})
    }).then(
    	(response) => (response.json())
       ).then((response)=>{
      if (response.status === 'success'){
        alert("Thank you for your feedback!");
        this.resetForm()
      }else if(response.status === 'fail'){
        alert("Message failed to send.")
      }
    })
  }





}

export default Contact;