const http = require('http');
const mongodb = require('mongodb')

const connectionString = "mongodb+srv://BekDev:bWIeFPWcrtwRn0lF@cluster0.4klsev9.mongodb.net/"

mongodb.connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, (err, client) => {
    if(err) console.log("ERROR on connection MongoDB");
    else {
        console.log("MongoDB connection succeed")
        const db = client.db('gym')
        module.exports = db;
        const app = require('./app');
        const server = http.createServer(app);
        let PORT = 3000;
        server.listen(PORT, function(){
            console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`); 
});
    }
});
