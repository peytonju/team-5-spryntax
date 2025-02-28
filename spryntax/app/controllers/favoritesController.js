const fs = require('fs');
const PATH = require('path');
const JSON_LEVEL_TAGS = JSON.parse(fs.readFileSync(PATH.join(__dirname, "../../website_static_build_tools/alg_extras/levels.json")).toString());
const LEVEL_NAME_TO_READABLE = JSON.parse(fs.readFileSync(PATH.join(__dirname, "../../website_static_build_tools/alg_extras/to_clean_names.json")).toString());
const LEVEL_NAME_TO_NONREADABLE = JSON.parse(fs.readFileSync(PATH.join(__dirname, "../../website_static_build_tools/alg_extras/to_nonclean_names.json")).toString());

const Favorites = require('../models/favorites');

const favoritesController = {
  get_favorite: (req, res) => {
    if (!req.session.user_id) {
      // User not logged in—render the view with favorites set to null.
      return res.render('favorites', { 
        favorites: null,
        level_tags: JSON_LEVEL_TAGS,
        nonreadable_to_readable: LEVEL_NAME_TO_READABLE,
        readable_to_nonreadable: LEVEL_NAME_TO_NONREADABLE,
        username: 'undefined'
      });
    }
    // If logged in, fetch favorites only for that user.
    Favorites.getByUserId(req.session.user_id, (err, favorites) => {
      if (err) {
        console.error('Error fetching favorites:', err);
        return res.status(500).send('Error fetching favorites');
      }
      res.render('favorites', { 
        favorites: favorites,
        level_tags: JSON_LEVEL_TAGS,
        nonreadable_to_readable: LEVEL_NAME_TO_READABLE,
        readable_to_nonreadable: LEVEL_NAME_TO_NONREADABLE,
        username: req.session.username || 'undefined'
      });
    });
  },

  // addFavorite and removeFavorite methods remain as before...
  addFavorite: (req, res) => {
    if (!req.session.user_id) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const user_id = req.session.user_id;
    const algorithmName = req.body.algorithmName;
    if (!algorithmName) {
      return res.status(400).json({ error: "Algorithm name is required" });
    }
    Favorites.addFavorite(user_id, algorithmName, (err, result) => {
      if (err) {
        console.error('Error adding favorite:', err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true });
    });
  },

  removeFavorite: (req, res) => {
    if (!req.session.user_id) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const user_id = req.session.user_id;
    const algorithmName = req.body.algorithmName;
    if (!algorithmName) {
      return res.status(400).json({ error: "Algorithm name is required" });
    }
    Favorites.removeFavorite(user_id, algorithmName, (err, result) => {
      if (err) {
        console.error('Error removing favorite:', err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true });
    });
  }
};

module.exports = favoritesController;
