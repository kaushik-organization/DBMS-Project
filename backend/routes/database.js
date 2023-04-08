const mysql = require("mysql2");

const connectionStart = async () => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  connection.connect();
  return connection;
};

module.exports = connectionStart;
