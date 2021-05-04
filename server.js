const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App is running on port ' + port);
})

app.use(express.static(path.join(__dirname, 'dist', 'auctive-ad,om')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'auctive-admin', 'index.html'));
})