const Stats = require('../models/stats');

const statsController = {
  get_stat: (req, res) => {
    if (!req.session.user_id) {
      return res.render('stats', { 
        stats: null,
        username: null,
        activePage: 'stats'
      });
    }
    Stats.getUserAggregatedStats(req.session.user_id, (err, aggregatedStats) => {
      if (err) {
        console.error('Error fetching aggregated stats:', err);
        return res.status(500).send('Error fetching stats');
      }
      res.render('stats', { 
        stats: aggregatedStats,
        username: req.session.username,
        activePage: 'stats'
      });
    });
  },
  addStat: (req, res) => {
    if (!req.session.user_id) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const user_id = req.session.user_id;
    const wpm = req.body.wpm;
    const program_language = req.body.program_language;
    
    if (!wpm) {
      return res.status(400).json({ error: "WPM value is required" });
    }
    if (!program_language) {
      return res.status(400).json({ error: "Program language is required" });
    }

    Stats.addStat(user_id, wpm, program_language, (err, result) => {
      if (err) {
        console.error("Error adding stat:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true });
    });
  }
};

module.exports = statsController;
