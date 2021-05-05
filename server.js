const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App is running on port ' + port);
})

app.use(express.static(path.join(__dirname, 'dist', 'auctive-admin')));
app.use(express.json());
app.get('test', (req, res) => {
    res.json("WELCOME")
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'auctive-admin', 'index.html'));
})