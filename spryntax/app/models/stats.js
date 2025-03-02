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
        return callback(null, { tests_completed: 0, total_time_spent: 0, avg_wpm: 0, best_wmp: 0});
      }
      // Return the first row
      callback(null, results[0]);
    });
  },
  // New: Aggregated daily stats for calendar heatmap
  getAggregatedStats: (user_id, callback) => {
    const query = `
      SELECT 
        UNIX_TIMESTAMP(DATE(created_at)) AS date,
        COUNT(*) AS tests_done,
        SUM(time_spent) AS total_time
      FROM stats
      WHERE user_id = ?
      GROUP BY DATE(created_at)
    `;
    db.query(query,   [user_id], (err, results) => {
      if (err) return callback(err);
      // Convert results to an object with Unix timestamps as keys and tests_done as values
      let data = {};
      results.forEach(row => {
        data[row.date] = row.tests_done; // or row.total_time if you prefer
      });
      callback(null, data);
    });
  },
  getDailyStatsForPastYear(user_id, callback) {
    const query = `
      SELECT DATE(created_at) AS date,
             COUNT(*) AS tests_done
      FROM stats
      WHERE user_id = ?
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;
    db.query(query, [user_id], (err, results) => {
      if (err) return callback(err);
  
      // Convert MySQL rows to an object or array
      // e.g. [ { date: '2024-03-02', tests_done: 5 }, ... ]
      callback(null, results);
    });
  }
};

module.exports = Stats;

