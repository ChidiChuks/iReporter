const express = require('express');
const middleware = require('./middleware/middleware');
const incidentApi = require('./API/incident');
const userApi = require('./API/user');

const app = express();
app.use(express.json());
app.use(incidentApi);
app.use(userApi);
app.use((req, res, next) => {
    next(new Error('error occured'));
});

app.use(middleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;