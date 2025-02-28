const Stats = require('../models/stats');

const statsController = {
  get_stat: (req, res) => {
    Stats.getAll((err, stats) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
        return;
      }
      res.render('stats', { 
        stats: stats,
        username: req.session.username || 'undefined',
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
    
    if (!wpm) {
      return res.status(400).json({ error: "WPM value is required" });
    }

    Stats.addStat(user_id, wpm, (err, result) => {
      if (err) {
        console.error("Error adding stat:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true });
    });
  }
};

module.exports = statsController;