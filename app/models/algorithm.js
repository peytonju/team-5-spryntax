const db = require('../../config/database');

const Algorithm = {
    getAll: (callback) => {
      db.query('SELECT * FROM algorithm', callback);
    }
  };

module.exports = Algorithm;