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
        username: req.session.username || 'undefined'
       });
    });
  }
};

module.exports = statsController;