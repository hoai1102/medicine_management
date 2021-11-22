const router = require('express').Router();

const { handleError } = require('../middlewares/error.middleware');
const { login, refreshToken } = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/refreshToken', refreshToken);

router.use(handleError);
module.exports = router;
