import koaRouter from 'koa-router';
import xiaoMi from '../controllers/xiaoMi';

const router = koaRouter({
  prefix: '/auth'
});
router.get('/xiaomi', xiaoMi.auth);

module.exports = router;
