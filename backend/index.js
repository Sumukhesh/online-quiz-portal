const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Database Connected !!");
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is Running at ${port} ...`);
}) 