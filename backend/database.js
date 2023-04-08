const mysql = require("mysql2/promise");

const connectionStart = async () => {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("Connected to PlanetScale!");
    return connection;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const connectionEnd = (connection) => {
  connection.end();
};

module.exports = { connectionStart, connectionEnd };
