import Model from '../models/index';

const getTodos = () => {
  return new Promise((resolve, reject) => {
    Model.Todo.find().exec().then((result) => {
      resolve(result);
    });
  });
};

const addTodo = (options) => {
  return new Promise((resolve, reject) => {
    Model.Todo.create(options).then((result) => {
      resolve(result);
    });
  });
};

export default {
  getTodos,
  addTodo
}
