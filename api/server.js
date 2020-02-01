const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const authenticate = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');
const parentRouter = require('../parent/parent-router');
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/auth', authRouter);
server.use('/api/parents', authenticate, parentRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = server;
