const express = require('express');
const { connection } = require('./config/db');
const { router, errHandler } = require('./routes/image.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use("/image", express.static("public/images"));
app.use(express.static(__dirname + "/public"))
app.use(errHandler)
app.use(router);

app.listen(8800, ()=>{
    console.log('Server is listening on http://localhost:8800');
    connection();
})