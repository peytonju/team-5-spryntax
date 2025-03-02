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

    // Basic validations
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
    // If user not logged in
    if (!req.session.user_id) {
      return res.render('stats', {
        stats: null,
        username: null,
        profileHeader: null, // We'll use this to store tests/time typed
        activePage: 'stats'
      });
    }

    // 1 Fetch aggregated data for the profile header
    Stats.getProfileHeaderStats(req.session.user_id, (err, profileHeader) => {
      if (err) {
        console.error('Error fetching aggregated stats:', err);
        return res.status(500).send('Error fetching stats');
      }
      // 2 Fetch the rest of the stats data (like aggregatedStats or raw stats)
      // For now, just pass null or do another query if you want
      res.render('stats', {
        stats: [], // or aggregated stats
        username: req.session.username,
        profileHeader: profileHeader, // pass our aggregated data
        activePage: 'stats'
      });
    });
  }
};

module.exports = statsController;
