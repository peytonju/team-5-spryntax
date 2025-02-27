const Favorites = require('../models/favorites');
const fs = require("fs");
const PATH_LEVEL_TAGS = require('path').join(__dirname, "../../website_static_build_tools/alg_extras", "levels.json");
const PATH_LEVEL_TO_CLEAN = require('path').join(__dirname, "../../website_static_build_tools/alg_extras", "to_clean_names.json");
const PATH_LEVEL_TO_NONCLEAN = require('path').join(__dirname, "../../website_static_build_tools/alg_extras", "to_nonclean_names.json");

const JSON_LEVEL_TAGS = JSON.parse(fs.readFileSync(PATH_LEVEL_TAGS).toString());
const LEVEL_NAME_TO_READABLE = JSON.parse(fs.readFileSync(PATH_LEVEL_TO_CLEAN).toString());
const LEVEL_NAME_TO_NONREADABLE = JSON.parse(fs.readFileSync(PATH_LEVEL_TO_NONCLEAN).toString());

const favoritesController = {
  get_favorite: (req, res) => {
    Favorites.getAll((err, favorites) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
        return;
      }
        res.render('favorites', { 
            favorites: favorites,
            level_tags: JSON_LEVEL_TAGS,
            nonreadable_to_readable: LEVEL_NAME_TO_READABLE,  // to_clean_names.json
            readable_to_nonreadable: LEVEL_NAME_TO_NONREADABLE  // to_nonclean_names.json
        });
    
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