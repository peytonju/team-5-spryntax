const db = require('../../config/database');

const Favorites = {
  getAll: (callback) => {
    db.query('SELECT * FROM favorites', callback);
  },
  addFavorite: (user_id, algorithmName, callback) => {
    const query = 'INSERT INTO favorites (user_id, algorithm_name) VALUES (?, ?)';
    db.query(query, [user_id, algorithmName], callback);
  },
  removeFavorite: (user_id, algorithmName, callback) => {
    const query = 'DELETE FROM favorites WHERE user_id = ? AND algorithm_name = ?';
    db.query(query, [user_id, algorithmName], callback);
  }
};

module.exports = Favorites;
