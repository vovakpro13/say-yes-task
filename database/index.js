const { connect } = require('mongoose');

const { config: { DB_URL } } = require('../constants');

connect(DB_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

module.exports.models  = require('./models');