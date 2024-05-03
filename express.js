// Requiring modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mssql = require("mysql2");
app.set("view engine", "ejs");

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like the HTML file)
app.use(express.static('public'));

var config = mssql.createConnection({
    host: "localhost",
    user: "root",
    password: "pavani0707",
    database: "helmetviolationchallans"
});

config.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
});

// Get request
app.get('/', function (req, res) {
 
    // Config your database credential
    res.render("extraction_challans");

});

app.post('/submitData', (req, res) => {
    const inputData = req.body.inputData;
    console.log('Received data from the client:', inputData);

    // You can process the data, interact with the database, etc.
    const selectQuery = 'SELECT count(*) as num FROM vehicle_number_plate where number_plate = "'+inputData+ '"';
    var count = 0;
    config.query(selectQuery, (error, results, fields) => {
    if (error) {
        console.error('Error executing SELECT query:', error);
        return;
    }

    // Process the results
    //console.log('Query results:', results);
    count = results[0].num;
    res.json({ numberplate : inputData, num: count });
    });
    
});
 
let server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});