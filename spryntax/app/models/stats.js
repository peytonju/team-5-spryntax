const db = require('../../config/database');

const Stats = {
  // Existing methods…
  addStat: (user_id, wpm, program_language, callback) => {
    const query = 'INSERT INTO stats (user_id, wpm, program_language, created_at) VALUES (?, ?, ?, NOW())';
    db.query(query, [user_id, wpm, program_language], callback);
  },
  // New method to get aggregated stats for a user:
  getUserAggregatedStats: (user_id, callback) => {
    const query = `
      SELECT program_language,
             COUNT(*) AS games_played,
             AVG(wpm) AS avg_wpm,
             MAX(wpm) AS best_wpm
      FROM stats
      WHERE user_id = ?
      GROUP BY program_language
    `;
    db.query(query, [user_id], callback);
  }
};

module.exports = Stats;
