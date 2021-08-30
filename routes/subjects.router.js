const express = require('express');
const router  = express.Router();
// Controller
const { getAll, create } = require('../controllers/subjects.controller');

console.log('\x1b[33m%s\x1b[0m', 'Registring subjects routing /api/subjects');

console.log('[POST] MW /create ');
router.post('/create', create);

console.log('[GET] MW /list ');
router.get('/list', getAll);

module.exports = router;
