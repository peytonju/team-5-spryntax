const db = require('../../config/database');

const Report = {
    getAll: (callback) => {
      db.query('SELECT * FROM bug_reports', callback);
    }
  };

module.exports = Report;