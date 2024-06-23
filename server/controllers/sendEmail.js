const nodemailer = require('nodemailer');

const sendEmail = async (emailsubject, emailaddress, message, requestType) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: emailaddress,
            subject: emailsubject,
            text: message,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 7px;">
                <div style="font-family: Monospace; background-color: #77f571; text-align: center; padding: 20px; border-radius: 5px">
                    <h2>Learning Portal Classerly</h2>
                </div>
                <p style="color: #666;">Dear User,</p>
                <p style="color: #666;">${requestType}</p>
                <div style="text-align: center">
                    <p style="padding: 5px; background-color: #fff; color: #333; margin: 0; width: 90%;">${message}</p>
                </div>
                <p style="color: #666;">If you did not request this, you can ignore this email.</p>
                <p style="color: #666;">Regards,<br/>Team,<br/>Career Counselling</p>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error); 
        throw error;  
    }
}

module.exports = sendEmail;
