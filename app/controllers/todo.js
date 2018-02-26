import Todo from '../services/todo';

// todo-app首页，渲染所有ToDo，并可以新建ToDo
const todoIndex = async (ctx, next) => {
  const todos = await Todo.getTodos('luck');
  await ctx.render('todo/index', {
    todos: todos,
    csrf: ctx.csrf,
    title: 'todos index'
  });
};

// 通过表单的post新建一个ToDo，并返回列表页
const addTodo = async (ctx, next) => {
  const requestData = ctx.request.body;
  const todo = {
    content: requestData.content
  }
  await Todo.addTodo(todo);
  ctx.redirect('/todo');
};

export default {
  addTodo,
  todoIndex
}
