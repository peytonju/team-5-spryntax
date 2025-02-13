const Algorithm = require('../models/algorithm');

const algorithmController = {
  level_select: (req, res) => {
    Algorithm.getAll((err, algorithm) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
        return;
      }
      res.render('level_select', { algorithms: algorithm });
    });
  }
};

module.exports = algorithmController;