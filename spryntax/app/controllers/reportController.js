const Report = require('../models/report');

const reportController = {
  report_select: (req, res) => {
    Report.getAll((err, reports) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
        return;
      }
      res.render('report', { reports: reports });
    });
  }
};

module.exports = reportController;