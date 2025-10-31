require('dotenv').config();
const express = require('express');
const {validate} = require('deep-email-validator');
const path = require('path') 

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/contacto/index.html'))
})
async function verifyRecaptcha (token) {
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaUrl = ``;

    const response = await fetch(recaptchaUrl, {method: 'POST'})
    const result = await response.json;

    return result.success;
}
app.post('/send-email', async (req, res) => {
    const {name, email, subject, message, 'g-recaptcha-response': recaptchaToken} = req.body;

if(!name || !email || !subject || !message || !recaptchaToken) {
    return res.status(400).json({status: 'error', message: 'Falta información importante'})
}}

const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
if(!isRecaptchaValid) {
    return res.status(400).json({
        status: 'error',
        message: 'Intenta otra vez'
    })
}