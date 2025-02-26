const db = require('../../config/database');

const Favorites = {
    getAll: (callback) => {
      db.query('SELECT * FROM favorites', callback);
    }
  };

module.exports = Favorites;