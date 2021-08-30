const express = require('express');
const router  = express.Router();
// Controller
const groupCourses = require('../controllers/group-courses.controller');
const courses      = require('../controllers/courses.controller');

console.log('\x1b[33m%s\x1b[0m', 'Registring courses routing /api/courses');

console.log('[POST] MW /group/create ');
router.post('/groups/create', groupCourses.create);

console.log('[GET] MW /group/list ');
router.get('/groups/list', groupCourses.getAll);

console.log('[POST] MW /create ');
router.post('/create', courses.create);

module.exports = router;
