const express = require('express');



//express app
const app = express();

//setting up the view files
app.set('view engine','ejs');

//assets handling
app.use('/static',express.static('static'));


app.listen(process.env.PORT || 4000);
console.log("listening to port 4000");
