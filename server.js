
import express from 'express'
import nodemailer from 'nodemailer'

import dotenv from 'dotenv'
const server = express()

dotenv.config()

const port = process.env.PORT

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'nickey968@gmail.com',
        pass: 'your-email-password', //email pass
    },
});


server.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body
    const mailOptions = {
        from: email,
        to: 'nickey968@gmail.com',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });

})

server.listen(port, () => console.log(`server is running on port ${port}`))
