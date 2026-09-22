const express = require('express');
const router = require('./router/assignmentRouter.js');

const app = express();
app.use(express.json()); 
app.use('/assignments', router);

module.exports = app;