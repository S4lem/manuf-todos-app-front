import http from "../http-common";

const getAll = () => {
  return http.get("/todos");
};

const create = data => {
    return http.post("/todos", data);
};

const remove = todoId => {
  return http.delete(`/todos/${todoId}`);
};


const TodosService = {
  getAll,
  create,
  remove,
};

export default TodosService;
