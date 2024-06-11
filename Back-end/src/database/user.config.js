const user = require('knex')({
    client: 'mssql',
    connection: {
      host : process.env.DB_HOST_USER,
      port : '1433',
      user : process.env.DB_USER_USER,
      password : process.env.DB_PASSWORD_USER,
      database : process.env.DB_DATABASE_USER
    },
    useNullAsDefault: false,
    log: {
      warn(message) {
        console.log(message)
      },
      error(message) {
        console.log(message)
      },
      deprecate(message) {
        console.log(message)
      },
      debug(message) {
        console.log(message)
      }
    }
});

user.client.config.connectionOptions = { multipleStatements: false };

module.exports = user;
