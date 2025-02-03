const db = require('../config/database');

const User = {
    create: (data) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO USERS SET ?', data, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = User;
