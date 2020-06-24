import React, { Component } from 'react';
import '../ForStores.css'

class ForStores extends Component {
  render() {
    // const questionList = [
    //   {description: 'How to render list in React?', key: 0},
    //   {description: 'Do you like JS?', key: 1},
    //   {description: 'Do you know CSS?', key: 2}
    // ];

    return (
        <div><br></br>
        <div className="title">
          <h3>Please join Headcount on a mission to encourage commonplace social distancing and promote the safety of our local community.
</h3>
        <div className="App">
          <div>
          <p>To be a part of Headcount, please <a href="https://forms.gle/Li4DYfRDz5CXd8i38">fill out this form</a>.
          We promise it will only take a few moments. After completing this form, an email should be sent to you within 1-2 hours.

            </p>
          <p>This email will contain your establishment's <b>unique QR Code</b>. This QR Code gives us the ability to track your store’s Headcount at any given time.
            </p>
          <p>Please print out the QR Code and display this image in front of <b>each entrance</b> to your store. This way, when customers enter the store, they can use their smartphone to “check-in”.</p>
          <p>It is crucial for Headcount's accuracy that the store <b>enforces and/or encourages</b> customers to check-in with the QR Code. If you are not sure how to enforce using the QR code, feel free to contact us and we can let you know what other stores have done!</p>
          <p>Finally, we want to assure you that there is absolutely no cost and minimal effort on behalf of your store to join Headcount.<br></br><br></br> Please email us at <i>headcount.live.feedback@gmail.com</i> for more information or visit our Contact Us page!</p>

</div>
        </div>
      </div>
      </div>
    );
  }
}

export default ForStores;