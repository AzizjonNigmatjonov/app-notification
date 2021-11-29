const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json())

const publicVapidKey = 'BAUyHHxjNKxLt4be4Bjz6nu8S0FSC20jwlgL-DKE7kwFWK-Obkj_FEkTvcYlUkNZPvkFOD2XZ-8nliYYtXqVjfY';
const privateVapidKey = '8DAFndg9MoIRvNEDpU2CUdhVAXX1tOM1yXP1UcxAewM';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//Subscribe Route
app.post('/subscribe', (req, res) => {
// get pushSubscriptionObject
  const subscription = req.body;

// Send 201 - resource created
    res.status(201).json({});

// Create Payload
    const payload = JSON.stringify({
        title: 'Push test'
    })

// Pass object into sendNotification
    webPush.sendNotification(subscription, payload).catch(err => console.log(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started at port ${port}`))