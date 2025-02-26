const Favorites = require('../models/favorites');

const favoritesController = {
  get_favorite: (req, res) => {
    Favorites.getAll((err, favorites) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
        return;
      }
      res.render('favorites', { favorites: favorites});
    });
  }
};

module.exports = favoritesController;