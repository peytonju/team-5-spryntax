const db = require('../../config/database');

const Leaderboard = {
    getAll: (callback) => {
      db.query('SELECT leaderboard.*, user.username FROM leaderboard INNER JOIN user ON leaderboard.user_id = user.user_id ORDER BY rank_place ASC', callback);
    }
  };

module.exports = Leaderboard;