const listCustomResponse = [   {
    regex: new RegExp('(\/json\/status\/200)'),
    func: (req, res) => {
        // Custom response
        res.statusCode = 200;
        // End of custom response part
    }
}
,   {
    regex: new RegExp('(\/json\/status\/401)'),
    func: (req, res) => {
        // Custom response
        res.statusCode = 401;
        // End of custom response part
    }
}
,   {
    regex: new RegExp('(\/json\/status\/501)'),
    func: (req, res) => {
        // Custom response
        res.statusCode = 501;
        // End of custom response part
    }
}
];

module.exports = { listCustomResponse };

