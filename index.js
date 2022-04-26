const Gamedig = require('gamedig');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const port = 1000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({status: 'error', message: 'not available'});
})

app.get('/info', (req, res) => {
    const { game, ip, port } = req.query;

    if(!game || !ip || !port) {
        return res.status(200).json({status: 'error', message: 'missing required fields'});
    }
    
    Gamedig.query({
        type: game,
        host: ip,
        port: port
    }).then((state) => {
        res.status(200).json({status: 'success', message: 'online', game: game, ipport: ip + ":" + port, ping: state.ping, playercount: state.players.length, maxplayercount: state.maxplayers,  });
    }).catch((error) => {
        console.log(error);
        return res.status(200).json({status: 'error', message: 'offline', game: game, ipport: ip + ":" + port});
    });
});

app.post('/info', (req, res) => {
    const { game, ip, port } = req.body;

    if(!game || !ip || !port) {
        return res.status(200).json({status: 'error', message: 'missing required fields'});
    }
    
    Gamedig.query({
        type: game,
        host: ip,
        port: port
    }).then((state) => {
        res.status(200).json({status: 'success', message: 'online', game: game, ipport: ip + ":" + port, ping: state.ping, playercount: state.players.length, maxplayercount: state.maxplayers,  });
    }).catch((error) => {
        console.log(error);
        return res.status(200).json({status: 'error', message: 'offline', game: game, ipport: ip + ":" + port});
    });
});

server.listen(port, () => {
    console.log(`Api listening on port ${port}`)
})
  