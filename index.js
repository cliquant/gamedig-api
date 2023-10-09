const express = require('express');
const Gamedig = require('gamedig');

const app = express();
const port = process.env.PORT || 1000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

app.get('/info', async (req, res) => {
  const { game, ip, port } = req.query;

  if (!game || !ip || !port) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const state = await Gamedig.query({
      type: game,
      host: ip,
      port: port,
    });

    res.status(200).json({
      status: 'success',
      message: 'Server is online',
      game: game,
      ipport: `${ip}:${port}`,
      ping: state.ping,
      playercount: state.players.length,
      maxplayercount: state.maxplayers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve server information',
      game: game,
      ipport: `${ip}:${port}`,
    });
  }
});

app.post('/info', async (req, res) => {
  const { game, ip, port } = req.body;

  if (!game || !ip || !port) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const state = await Gamedig.query({
      type: game,
      host: ip,
      port: port,
    });

    res.status(200).json({
      status: 'success',
      message: 'Server is online',
      game: game,
      ipport: `${ip}:${port}`,
      ping: state.ping,
      playercount: state.players.length,
      maxplayercount: state.maxplayers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve server information',
      game: game,
      ipport: `${ip}:${port}`,
    });
  }
});

app.get('/players', async (req, res) => {
  const { game, ip, port } = req.query;

  if (!game || !ip || !port) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const state = await Gamedig.query({
      type: game,
      host: ip,
      port: port,
    });

    res.status(200).json({
      status: 'success',
      message: 'Player list retrieved',
      game: game,
      ipport: `${ip}:${port}`,
      players: state.players,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve player list',
      game: game,
      ipport: `${ip}:${port}`,
    });
  }
});

app.get('/server-status', async (req, res) => {
  const { game, ip, port } = req.query;

  if (!game || !ip || !port) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const state = await Gamedig.query({
      type: game,
      host: ip,
      port: port,
    });

    res.status(200).json({
      status: 'success',
      message: 'Server status retrieved',
      game: game,
      ipport: `${ip}:${port}`,
      online: true,
      ping: state.ping,
      playercount: state.players.length,
      maxplayercount: state.maxplayers,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      status: 'success',
      message: 'Server is offline',
      game: game,
      ipport: `${ip}:${port}`,
      online: false,
    });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
