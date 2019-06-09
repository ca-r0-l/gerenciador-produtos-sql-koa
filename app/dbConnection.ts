import * as sql from "mssql";
import dbConfig from './dbConfig';

const connection = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Connected to database!');
    return pool;
  })
  .catch(err => console.log('Database connection failed: ', err));

export default connection;