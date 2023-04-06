const mysql = require("mysql2");

const connectionStart = () => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  console.log("Connected to PlanetScale!");
  return connection;
};

const connectionEnd = (connection) => {
  connection.end();
};

module.exports = { connectionStart, connectionEnd };
