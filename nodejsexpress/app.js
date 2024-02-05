const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// function log(req, res, next) {
//     // TODO: schrijf in terminal datum, request method en url
//     console.log(new Date(), 'Request method: ', req.method, 'URL: ', req.url);
//     next();
//     // next() roept de volgnede middelware functie aan in de stack
// }

// function welcome(req, res, next) {
//     // TODO: de text 'hallo' naar de browser sturen
//     // res.send('hallo');
//     // next();

//     res.writeHead(200, {
//         'Content-Type': 'application/json'  
//     });
//     res.write('{"naam": "Piet"}');
//     res.end();
//     // dit is de laatste middleware functie in de stack dus daarom res.end()
// }


// app.use('/test/', log, welcome);
// // bij het toevoegen van /test/ moet je naar http://localhost:3000/test/ gaan om het werkend te maken

// http.createServer(app).listen(3000, function() {
//     console.log('Server gestart op http://localhost:3000');
// });

const port = 3000;

const users = [
    { id: 1, name: 'Piet' },
    { id: 2, name: 'Jan' },
    { id: 3, name: 'Marie' },
    { id: 4, name: 'Klaas' },
    { id: 5, name: 'Jantje' },
    { id: 6, name: 'Pietje' },
    { id: 7, name: 'Marieke' },
    { id: 8, name: 'Klaasje' },
    { id: 9, name: 'Jantina' },
    { id: 10, name: 'Pietrina' }
];

function logRequestDetails(req, res, next) {
    console.log(new Date(), 'Request method:', req.method, 'URL:', req.url);
    next();
}

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

function getUsers(req, res, next) {
    if (req.method === 'GET') {
        res.status(200).json(users);
        next();
    } else {
        next();
    }
}

function addUser(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({ message: 'User added' });
    }
}

app.use('/users', logRequestDetails, getUsers, addUser);

app.use(errorHandler);

http.createServer(app).listen(port, function () {
    console.log('Server started on http://localhost:' + port);
});