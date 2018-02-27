import koaRouter from 'koa-router';
import auth from '../controllers/auth';

const router = koaRouter({
  prefix: '/auth'
});
router.get('/xiaomi', auth.xiaoMi);

module.exports = router;
