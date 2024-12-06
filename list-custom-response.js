const listCustomResponse = [   (req, res) => {
        const regex = new RegExp('(\/dummy\/json\/status\/200)');

        if ( ! regex.test( req.url ) ) {
            return false;
        }

        console.log('Custom response regex is found: ', regex.toString());

        // Custom response
        res.statusCode = 200;
        // End of custom response part

        return true;
    }
,   (req, res) => {
        const regex = new RegExp('(\/dummy\/json\/status\/401)');

        if ( ! regex.test( req.url ) ) {
            return false;
        }

        console.log('Custom response regex is found: ', regex.toString());

        // Custom response
        res.statusCode = 401;
        // End of custom response part

        return true;
    }
,   (req, res) => {
        const regex = new RegExp('(\/dummy\/json\/status\/501)');

        if ( ! regex.test( req.url ) ) {
            return false;
        }

        console.log('Custom response regex is found: ', regex.toString());

        // Custom response
        res.statusCode = 501;
        // End of custom response part

        return true;
    }
];

module.exports = { listCustomResponse };

