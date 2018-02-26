import koaRouter from 'koa-router';

const router = koaRouter({
  prefix: '/articles'
});
// 路由/articles必须定义在含有{prefix: '/articles'}的路由文件里

router.get('/:id/author', (ctx, next) => {
  ctx.body = 'article author page';
});
router.get('/:id/info', (ctx, next) => {
  ctx.body = 'article info page';
});
// 要注意的是，需要把/路由，也就是/articles路由放在最后
// 因为路由是个中间件，会从上到下取第一个匹配的。
// 如果/articles在上面的话，则/:id/info会正常匹配，但/:id/info/会匹配到/articles
router.get('/', (ctx, next) => {
  ctx.body = 'articles page';
});

module.exports = router;
