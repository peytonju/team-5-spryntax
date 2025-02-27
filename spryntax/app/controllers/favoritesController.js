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
  },

  addFavorite: (req, res) => {
    if (!req.session.user_id) {
      console.error('User not logged in');
      return res.status(401).json({ error: "User not logged in" });
    }
    const user_id = req.session.user_id;
    const algorithmName = req.body.algorithmName;
  
    if (!algorithmName) {
      console.error('Algorithm name missing');
      return res.status(400).json({ error: "Algorithm name is required" });
    }
  
    Favorites.addFavorite(user_id, algorithmName, (err, result) => {
      if (err) {
        console.error('Error adding favorite:', err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true });
    });
  }
  
  
};

module.exports = favoritesController;