const {Router} = require(`express`);

const router = new Router();

router.post(`/registration`);
router.post(`/login`);
router.post(`/logout`);
router.get(`/activate/:link`);
router.get(`/refresh-token`);
router.get(`/users`);

module.exports = router;
