const nodemailer = require("nodemailer");

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.HOTMAIL_EMAIL,
    pass: process.env.HOTMAIL_PASSWORD,
  },
});

// Function to send welcome email with HTML template
const welcomeEmail = async (toEmail, clientName) => {
  try {
    if (!toEmail) {
      throw new Error("Email is required");
    }

    // Create email options
    let mailOptions;
    if (clientName) {
      mailOptions = {
        from: process.env.HOTMAIL_EMAIL,
        to: toEmail,
        subject: 'Welcome to Tek Vision',
        html: `
          <html>
            <head>
              <style>
                /* Add your CSS styles here */
              </style>
            </head>
            <body>
              <h1>Welcome to Tek Vision, Mr/Ms ${clientName}!</h1>

              <!-- Add more HTML content as needed -->

              <img src="https://cdni.iconscout.com/illustration/premium/thumb/welcome-board-3688623-3231454.png" alt="Tek Vision Welcome pic" width="700" height="500">
            </body>
          </html>
        `,
      };
    } else {
      mailOptions = {
        from: process.env.HOTMAIL_EMAIL,
        to: toEmail,
        subject: 'Contact Us',
        html: `
          <html>
            <head>
              <style>
                /* Add your CSS styles here */
              </style>
            </head>
            <body>
              <h1>Contact Tek Vision</h1>

              <!-- Add more HTML content as needed -->
            </body>
          </html>
        `,
      };
    }

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

  } catch (error) {
    console.log("Error sending email:", error);
  }
};

module.exports = { welcomeEmail };
