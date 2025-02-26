const db = require('../../config/database');

const Stats = {
    getAll: (callback) => {
      db.query('SELECT * FROM stats', callback);
    }
  };

module.exports = Stats;