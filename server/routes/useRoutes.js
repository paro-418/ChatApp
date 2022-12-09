const {
  register,
  allUsers,
  login,
  getAUser,
} = require('../controllers/userController.js');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/allUsers', allUsers);
router.get('/allUsers/:id', getAUser);

module.exports = router;
