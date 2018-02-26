import koaRouter from 'koa-router';
import todo from '../controllers/todo';

const router = koaRouter({
  prefix: '/todo'
});

router.post('/new', todo.addTodo);
router.get('/', todo.todoIndex);
module.exports = router;
