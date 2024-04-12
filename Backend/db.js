// db.js
const mysql = require('mysql');

class Database {
  constructor() {
    this.pool = mysql.createPool({

      
  connectionLimit: 10,
  host: 'sql6.freesqldatabase.com',
  user: 'sql6697993',
  password: 'CCXiZtEaeQ',
  database: 'sql6697993'
});

    
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, args, (err, rows) => {
        if (err)
          return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    this.pool.end();
  }
}

module.exports = new Database();
