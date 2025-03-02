const Report = require('../models/report');

const reportController = {
  report_select: (req, res) => {
    Report.getAll((err, report) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
        return;
      }
      res.render('report', { 
        reports: report, 
        username: req.session.username || 'undefined',
        activePage: 'report'
      });
    });
  }
};

module.exports = reportController;