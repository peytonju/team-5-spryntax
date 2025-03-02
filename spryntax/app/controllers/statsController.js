const Stats = require('../models/stats');

const statsController = {
  addStat: (req, res) => {
    if (!req.session.user_id) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const user_id = req.session.user_id;
    const wpm = req.body.wpm;
    const program_language = req.body.program_language || 'Unknown';
    const time_spent = req.body.time_spent || 0;

    if (!wpm) {
      return res.status(400).json({ error: "WPM value is required" });
    }

    Stats.addStat(user_id, wpm, program_language, time_spent, (err, result) => {
      if (err) {
        console.error("Error adding stat:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true });
    });
  },

  get_stat: (req, res) => {
    if (!req.session.user_id) {
      return res.render('stats', {
        stats: null,
        username: null,
        profileHeader: null,
        aggregatedData: null,
        activePage: 'stats'
      });
    }
    // First, fetch aggregated data for the profile header
    Stats.getProfileHeaderStats(req.session.user_id, (err, profileHeader) => {
      if (err) {
        console.error('Error fetching profile header stats:', err);
        return res.status(500).send('Error fetching stats');
      }
      Stats.getDailyStatsForPastYear(req.session.user_id, (err, dailyStats) => {
        if (err) {
          console.error('Error fetching daily stats:', err);
          return res.status(500).send('Error fetching stats');
        }
        // Finally, render with dailyStats
        res.render('stats', {
          stats: [], // or more data
          username: req.session.username,
          profileHeader: profileHeader,
          activePage: 'stats',
          dailyStats: dailyStats  // pass the array to the view
        });
      });
  });
 }
}

module.exports = statsController;
