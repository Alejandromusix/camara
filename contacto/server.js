const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000


app.use(cors())
app.use(bodyParses.json())

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/api/contact', (req, res)=> {
    const {name, email, subject, message} = req.body

    if(!name || !email || !subject || !message) {
        return res.status(400).json({error: "Todas las áreas son requeridas"})
    }

    const adminHtml = `
    <div>
    <h1>Nuevo email de usuario</h1>
    <p>Un usuario te ha enviado un nuevo correo</p>
    <p>Nombre: ${name}</p>
    <p>Email: ${email}</p>
    <p>Mensaje:</p>
    <p>${message}</p>
    </div>
    `

    const userHtml = `
    <div>
    <h1>¡Tu mensaje ha sido recibido!</h1>
    <p>Querido/a ${name}, tu mensaje ha sido envíado correctamente.</p>
    <p>Saludos desde: CGCM</p>
    </div>
    `
    const adminMailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `${subject}`,
        html: adminHtml,
    };
    const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Gracias por contactarnos | CGCM',
        html: userHtml,
    }
    transporter.sendMail(adminMailOptions, (error, info) => {
        if(error) {
            console.error('Error enviando el correo:', error);
            return res.status(500).json({ error:'Falla al enviar el correo al admin.'})
        }
        console.log('Email enviado.', info.response);

        transporter.sendEmail(userMailOptions, (error, info) => {
            if(error) {
                console.error('Error enviando al usuario:', error);
                return res.status(500).json({ error: 'Falla al reconocer el correo'})
            }
            console.log('Email reconocido y enviado:', info.response);
            res.status(200).json({ success: true, message: 'Emails enviados satisfactoriamente'}) 
        });
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http:localhost:${PORT}`)
})