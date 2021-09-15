var liveServer = require("live-server");
 
var params = {
    port: 8181, // Set the server port. Defaults to 8080.
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
};
liveServer.start(params);