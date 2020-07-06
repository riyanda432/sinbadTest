var express = require('express');
var router = express.Router();
var cors = require('cors')

const customerController = require('../controllers/index').customer;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/customer-list',cors(), customerController.list);
router.post('/api/v1/customer-create', customerController.add);
router.delete('/api/v1/customer-delete/:id',cors({credentials: true, origin: true}), customerController.delete);
router.put('/api/v1/customer-update',cors({credentials: true, origin: true}), customerController.update);
router.post('/api/v1/customer-login', customerController.login);

module.exports = router;
