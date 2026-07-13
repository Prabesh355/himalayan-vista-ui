const nodemailer = require('nodemailer');

// Email service for sending notifications
const emailService = {
  // Create transporter with Gmail credentials from env
  getTransporter: () => {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'nomadsnavigate@gmail.com',
        pass: process.env.GMAIL_PASS || process.env.GMAIL_APP_PASSWORD,
      },
    });
  },

  // Send booking notification to admin
  sendBookingNotification: async (bookingData, travelerDetails) => {
    try {
      const transporter = emailService.getTransporter();
      
      const adminEmail = process.env.ADMIN_EMAIL || 'nomadsnavigate@gmail.com';
      const bookingDate = new Date(bookingData.travelDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const mailOptions = {
        from: process.env.GMAIL_USER || 'nomadsnavigate@gmail.com',
        to: adminEmail,
        subject: `New Booking: ${bookingData.packageName} - ${bookingData.bookingNumber}`,
        html: `
          <h2>New Booking Received!</h2>
          <p><strong>Booking Number:</strong> ${bookingData.bookingNumber}</p>
          <p><strong>Package:</strong> ${bookingData.packageName}</p>
          <p><strong>Travel Date:</strong> ${bookingDate}</p>
          <p><strong>Number of Travelers:</strong> ${bookingData.numberOfTravelers}</p>
          <p><strong>Total Price:</strong> NPR ${bookingData.totalPrice}</p>
          
          <h3>Traveler Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${travelerDetails.firstName} ${travelerDetails.lastName}</li>
            <li><strong>Email:</strong> ${travelerDetails.email}</li>
            <li><strong>Phone:</strong> ${travelerDetails.phone}</li>
            <li><strong>Country:</strong> ${travelerDetails.country || 'N/A'}</li>
          </ul>
          
          <p>Please log in to your admin panel to view full details and confirm this booking.</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Booking notification sent to ${adminEmail}`);
      return true;
    } catch (error) {
      console.error('Error sending booking notification:', error.message);
      throw error;
    }
  },

  // Send booking confirmation to customer
  sendBookingConfirmation: async (travelerEmail, bookingData) => {
    try {
      const transporter = emailService.getTransporter();
      
      const bookingDate = new Date(bookingData.travelDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const mailOptions = {
        from: process.env.GMAIL_USER || 'nomadsnavigate@gmail.com',
        to: travelerEmail,
        subject: `Booking Confirmed: ${bookingData.packageName} - ${bookingData.bookingNumber}`,
        html: `
          <h2>Your Booking is Confirmed!</h2>
          <p>Thank you for booking with Nomads Navigate Nepal.</p>
          
          <p><strong>Booking Number:</strong> ${bookingData.bookingNumber}</p>
          <p><strong>Package:</strong> ${bookingData.packageName}</p>
          <p><strong>Travel Date:</strong> ${bookingDate}</p>
          <p><strong>Total Price:</strong> NPR ${bookingData.totalPrice}</p>
          
          <p>Our team will contact you soon to confirm details and process your payment.</p>
          <p>Thank you for choosing Nomads Navigate Nepal!</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Booking confirmation sent to ${travelerEmail}`);
      return true;
    } catch (error) {
      console.error('Error sending booking confirmation:', error.message);
      throw error;
    }
  },
};

module.exports = emailService;
