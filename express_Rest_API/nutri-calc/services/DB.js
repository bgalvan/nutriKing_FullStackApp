const environment = process.env.NODE_ENV || "development"; // if something else isn't setting ENV, use development
const configuration = require("../knexfile")[environment]; // require environment's settings from knexfile

const knex = require("knex")(configuration);

module.exports = knex;
