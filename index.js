const express      = require('express');
const app          = express();
const path         = require('path');
const fs           = require('fs');
const libxmljs     = require('libxmljs');
const { platform } = require('node:process');

const PORT         = 3000;

const { listCustomResponse } = require('./list-custom-response');

app.all('/', (req, res) => {
    res.send('home');
});

app.all('/*', (req, res) => {
    try {
        console.log('\n');

        // req.url: '\dummy\json'
        console.log('req.url: ', req.url);

        // Special cases for certain URL such as favicon.ico on Browser or custom response
        if ( req.url === '/favicon.ico' ) {
            console.log('path.join: ', path.join( __dirname , req.url ));

            console.log('It is Icon file!');
            res.sendFile( path.join( __dirname , req.url ) );

            return;
        }

        // Special cases for custom response
        const foundIndex = listCustomResponse.find( func => func(req, res) );

        if ( foundIndex === undefined ) {
            console.log('Custom response regex is not found!');
        }
        // End of special cases part

        // Get directory and file path for dummy response message
        let url;

        if ( platform === 'win32' ) {
            // req.url: /dummy/json
            // url (AFTER):  \dummy\json
            url = req.url.replaceAll('/','\\');
        } else {
            url = req.url;
        }

        const fileName = 'index.txt';

        // path.join: 'C:\Dev64\workspace_personal\serverdummy' + '\dummy\json' + 'index.txt'
        console.log('path.join: ', path.join( __dirname , url , fileName ));
        // End of get directory and file path for dummy response message part

        // Set dummy response message
        fs.readFile( path.join( __dirname , url , fileName ) , 'utf8', ( err , data ) => {
            if ( err ) {
                console.error('Error fs.readFile: ', err);

                res.statusCode = 500;

                res.set( 'Content-Type' , 'text/plain' );

                res.send( "ERROR: " + err );

                return;
            }

            try {
                JSON.parse( data );

                console.log('It is JSON file!');
                res.set( 'Content-Type' , 'application/json' );

                res.send( data );

                return;
            } catch ( err ) {
                console.log('It is not JSON file!');
            }

            try {
                libxmljs.parseXml( data );

                console.log('It is XML file!');
                res.set( 'Content-Type' , 'application/xml' );

                res.send( data );

                return;
            } catch ( err ) {
                console.log('It is not XML file!');
            }

            console.log('It is Text file!');
            res.set( 'Content-Type' , 'text/plain' );

            res.send( data );

            return;
        });
        // End of set dummy response message part
    } catch ( err ) {
        console.error('Error has happened: ', err);

        res.statusCode = 500;

        res.set( 'Content-Type' , 'text/plain' );

        res.send( "ERROR: " + err );
    }
});

app.listen(PORT);

console.log('Server running.');

