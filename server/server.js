"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var backendapi_1 = require("./routes/backendapi");
var Server = /** @class */ (function () {
    function Server() {
        // create expressjs application
        this.app = express();
        // configure application
        this.config();
        // configure routes
        this.routes();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        // Parsers for POST data
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Point static path to dist
        this.app.use(express.static(path.join(__dirname, 'public')));
        /**
         * Get port from environment and store in Express.
         */
        var port = process.env.PORT || '3000';
        this.app.set('port', port);
        /**
         * Create HTTP server.
         */
        var server = http.createServer(this.app);
        /**
         * Listen on provided port, on all network interfaces.
         */
        server.listen(port, function () { return console.log("API running on localhost:" + port); });
    };
    Server.prototype.routes = function () {
        // get router
        var router;
        router = express.Router();
        // create routes
        var api = new backendapi_1.BackendApi();
        // test API
        router.get('/api/test', api.test.bind(api.test));
        // use router middleware
        this.app.use(router);
        // Catch all other routes and return the index file
        this.app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });
    };
    return Server;
}());
Server.bootstrap();
