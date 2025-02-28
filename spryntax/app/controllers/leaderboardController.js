const Leaderboard = require('../models/leaderboard');

const leaderboardController = {
  table_select: (req, res) => {
    Leaderboard.getAll((err, leaderboard) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
        return;
      }
      res.render('leaderboard', { 
        leaderboards: leaderboard,
        username: req.session.username || 'undefined',
        activePage: 'leaderboard'
       });
    });
  }
};

module.exports = leaderboardController;