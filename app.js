const express = require('express');

require('./helpers').chekDB;
const { config: { PORT, DB_URL } } = require('./constants');
const { achievementsRouter } = require('./routes');
const { ErrorHandler } = require('./errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/achievements', achievementsRouter);
app.use('*', ErrorHandler.throwNotFound);

app.use(ErrorHandler.handleErrors);

app.listen(PORT, () => console.log(`Server started on ${ PORT }`));