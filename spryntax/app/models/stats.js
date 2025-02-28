const db = require('../../config/database');

const Stats = {
    getAll: (callback) => {
      db.query('SELECT * FROM stats', callback);
    },
    addStat: (user_id, wpm, callback) => {
      const query = 'INSERT INTO stats (user_id, wpm, created_at) VALUES (?, ?, NOW())';
      db.query(query, [user_id, wpm], callback);
    }
  };

module.exports = Stats;