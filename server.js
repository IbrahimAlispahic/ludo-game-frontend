const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/LUDO-angular'));

app.listen(process.env.PORT || 4200);

//PathLocationStrategy

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/LUDO-angular/src/index.html'));
})

console.log('Console listening!');