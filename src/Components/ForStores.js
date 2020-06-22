import React, { Component } from 'react';
import '../ForStores.css'
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

class ForStores extends Component {
  render() {
    const questionList = [
      {description: 'How to render list in React?', key: 0},
      {description: 'Do you like JS?', key: 1},
      {description: 'Do you know CSS?', key: 2}
    ];

    return (
        <div className="title">
          <h1>Please follow the steps below to join Headcount as a store!</h1>
        <div className="App">
          <div>
          <p>First, please fill out the following <a href="https://forms.gle/Li4DYfRDz5CXd8i38">form</a>. This form will ask you to provide some basic store information so we can generate a QR code for your store!</p>
          <p>After completing the form, an email should be sent to you within 1-2 hours. This email will contain a pdf of a unique QR Code for your store.</p>
          <p>Please print out the QR Code from the email and display the QR code near the entrance of your store's building. If your store has multiple entrances, please print/display a QR code at each entrance. </p>
          <p>It is crucial for Headcount's accuracy that the store both enforces and encourages customers to check-in with the QR Code. If you are not sure how to enforce using the QR code, feel free to contact us and we can let you know what other stores have done!</p>
          <p>Finally, we want to emphasis that there is absolutely no cost and minimal effort on behalf of your store to join Headcount. With this in mind, we hope you consider joining Headcount to reduce the spread of COVID-19 and to promote social distancing during this pandemic.</p>

</div>
        </div>
      </div>
    );
  }
}

export default ForStores;