import keys from './mySql';
import mysql from 'mysql'

//  "build": "tsc -w" // para que se actualice automaticamente el archivo js hay que agregarlo en el package.json

const pool = mysql.createPool(keys.database);


pool.getConnection((err, connection) => {
     if (err) {
          console.error('Error connecting to database: ', err);
          return;
        }
        
        connection.release(); 
        console.log('DB is connected');
});

export default pool;
