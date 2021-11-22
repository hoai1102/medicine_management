const router = require('express').Router();

const { handleError } = require('../middlewares/error.middleware');
const { getUser, create } = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');

router.get('/getUser', verifyToken, getUser);
router.post('/create', create);
router.use(handleError);
module.exports = router;
