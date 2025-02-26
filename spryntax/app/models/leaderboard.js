const db = require('../../config/database');

const Leaderboard = {
    getAll: (callback) => {
      db.query('SELECT * FROM leaderboard ORDER BY rank_place ASC', callback);
    }
  };

module.exports = Leaderboard;