
  
import TodosDataService from "../services/TodosService";
  
  export const saveTodo = async (label) => {
    const res = await TodosDataService.create({"label": label});
    console.log(res)
    return res
  }
  
  /*
  export const retrieveTodos = () => {
    const res = TodosDataService.getAll();
    console.log(res)
    return res
  };
*/


export const retrieveTodos = async () => {
    try {
        const response = await TodosDataService.getAll();
        return response
    } catch (err) {
        console.log("error here");
        console.log(err);
    }
    
  };

  
  export const deleteTodoById = async (id) => {
    const res = await TodosDataService.remove(id);
    return res
  };
  
