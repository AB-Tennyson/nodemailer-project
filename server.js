const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();

// Set up the server to use static files (HTML, CSS, JS)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Create a route for the form submission
app.post("/send-email", (req, res) => {
  console.log(req.body);
  const { name, subject, message, recipient } = req.body; // Now receiving recipient from form

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "feedbacktennyson69@gmail.com", // Your email here
      pass: "mnvmmwrwwzwoqedq", // Your email password here
    },
  });

  const mailOptions = {
    from: "feedbacktennyson69@gmail.com", // Sender's email (from the form)
    to: recipient, // Now using the recipient's email from the form
    subject: subject, // Subject from the form
    text: message, // Body of the message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.send("Error sending email.");
    }
    console.log("Email sent: " + info.response);
    res.sendFile(__dirname + '/emailConfirmation.html');
    //res.redirect("emailConfirmation.html");
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
