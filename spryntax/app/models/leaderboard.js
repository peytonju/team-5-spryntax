const db = require('../../config/database');

const Leaderboard = {
    getAll: (callback) => {
      db.query(`
        SELECT stats.*, user.username FROM stats 
        INNER JOIN user ON stats.user_id = user.user_id 
        WHERE stats.wpm = (
        SELECT MAX(new_stats.wpm) 
        FROM stats new_stats
        WHERE new_stats.user_id = stats.user_id
        ) 
        GROUP BY stats.user_id 
        ORDER BY wpm DESC`
        , callback);
    }
  };

module.exports = Leaderboard;