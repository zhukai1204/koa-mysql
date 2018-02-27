import Koa from 'koa';
import nunjucks from 'nunjucks';
import views from 'koa-views';
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser')();
import router from './routes/index';

const app = new Koa();

// 配置nunjucks模板文件所在的路径，否则模板继承时无法使用相对路径
nunjucks.configure(__dirname + '/templates', { autoescape: true });

app.use(convert(bodyparser));

app.use(views(__dirname + '/templates', {
  map: {
    html: 'nunjucks'
  }
}));

app.use(router.routes(), router.allowedMethods());
app.listen(7000);
console.log('listen http://localhost:7000');
export default app;
