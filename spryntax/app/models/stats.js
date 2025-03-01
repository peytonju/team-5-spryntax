const db = require('../../config/database');

const Stats = {
  addStat: (user_id, wpm, program_language, time_spent, callback) => {
    const query = `
      INSERT INTO stats (user_id, wpm, program_language, time_spent, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(query, [user_id, wpm, program_language, time_spent], callback);
  },

  // We'll add an aggregated query for the profile header:
  getProfileHeaderStats: (user_id, callback) => {
    const query = `
      SELECT
        COUNT(*) AS tests_completed,
        SUM(time_spent) AS total_time_spent,
        AVG(wpm) AS avg_wpm,
        MAX(wpm) AS best_wpm
      FROM stats
      WHERE user_id = ?
    `;
    db.query(query, [user_id], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) {
        return callback(null, { tests_completed: 0, total_time_spent: 0 });
      }
      // Return the first row
      callback(null, results[0]);
    });
  }
};

module.exports = Stats;

