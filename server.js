const http = require('http');

const debug = require("debug")("node-angular");
// express module import
const app  = require('./app');


const normalizedPort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)){
        //named pipe
        return val;
    }

    if(port >= 0){
        // port number
        return port;
    }

    return false;
}

const onError = error =>{
    if(error.syscall !== "listen"){
        throw error;
    }
    const bind = typeof port === "string" ? "pipe" + port : "port" + port;
    switch(error.code){
        case "EACCES":
            console.error(bind + "requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + "is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () =>{
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe" + port : "port" + port;
    debug("Listening on" + bind);
}

const port = normalizedPort(process.env.PORT || 3000);

app.set("port", port);

// express를 이용한 서버 생성. 
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);


//3000 or env port 로 오는 req 처리를 위해 사용
server.listen(port);


