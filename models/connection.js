const mysqlx = require('@mysql/xdevapi');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

let schema = null;

const connection = async () => (
  schema
    ? Promise.resolve(schema)
    : mysqlx.getSession(config)
      .then((session) => {
        schema = session.getSchema('cookmaster');
        return schema;
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      })
);

module.exports = connection;
