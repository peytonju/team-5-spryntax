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

    // First, fetch the raw data points
    Stats.getRawStats(req.session.user_id, (err, rawStats) => {
      if (err) {
        console.error("Error fetching raw stats:", err);
        return res.status(500).send("Error fetching stats");
      }
      // Next, fetch aggregated profile header stats
      Stats.getProfileHeaderStats(req.session.user_id, (err, profileHeader) => {
        if (err) {
          console.error("Error fetching profile header stats:", err);
          return res.status(500).send("Error fetching stats");
        }
        // Finally, fetch the daily stats for the heatmap
        Stats.getDailyStatsForPastYear(req.session.user_id, (err, dailyStats) => {
          if (err) {
            console.error("Error fetching daily stats:", err);
            return res.status(500).send("Error fetching stats");
          }
          res.render('stats', {
            stats: [], // You can add additional aggregated stats here if needed.
            username: req.session.username,
            profileHeader: profileHeader,
            dailyStats: dailyStats,
            rawData: rawStats, // Pass raw data to the view
            activePage: 'stats'
          });
        });
      });
    });
  }
};

module.exports = statsController;
