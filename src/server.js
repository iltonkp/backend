//imports externos
const express = require('express');
const mogoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//imports internos
const Routes = require('./routes');

//Definindo variável da aplicação
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

//Configurando socket.io
io.on("connection", socket => {
    socket.on('connectionRoom', box => {
        socket.join(box);
    })
});


//Conectando no banco de dados com o mongoose
mogoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster0-kuomn.azure.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;
    return next();
});

//configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));


// Configurações das rotas
app.use(Routes);



//start do servidor 
server.listen(3333);


