import express from 'express';
import { appendFileSync } from 'fs'; // for writing the txt file

// instantiate server
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// callback function
// app.get('/greeting', (req, res) => {
//     res.send('Hello' + req.query.name);

// });

// app.post('/submit-data', (req, res) => {
//     res.send('Received a POST request from' + req.body.name);
// });

app.post('/add-book', (req, res) => {
    var data = req.body; // passed data
    // check if data is not empy
    if (typeof data === "null"){ 
        res.send({success: false}); // if data is null, log false
    }

    if (typeof data === "object" && Object.keys(data).length === 4){ // if data is an object and has 4 fields (keys)
        if (Object.keys(data).includes('bookName') && data.bookName != "") {
            if (Object.keys(data).includes('isbn') && data.isbn != "") {
                if (Object.keys(data).includes('author') && data.author != "") {
                    if (Object.keys(data).includes('yearPublished') && data.yearPublished != "") {
                        //create string to append
                        var appendData = data.bookName + ', ' + data.isbn + ', ' + data.author + ', ' + data.yearPublished + '\n';

                        appendFileSync('books.txt', appendData); // write to books.txt
                        res.send({success: true}); // log success
                    }
                }
            }
        }
    } else {
        res.send({success: false}); // log false
    }
});


// tell server to listen to port 3000, with callback after server is started
app.listen(3000, () => {console.log('Server started at port 3000')});