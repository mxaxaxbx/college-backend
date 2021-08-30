const express = require('express');
const router  = express.Router();
// Controller
const { register } = require('../controllers/users.controller');

console.log('\x1b[33m%s\x1b[0m', 'Registring users routing /api/users');

console.log('[POST] MW /register ');
router.post('/register', register);

module.exports = router;
