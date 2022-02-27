import axios from 'axios'
import User from '@/types/User'

type State={
  todos:User[]
}

const state:State={
  todos:[]
};

const getters={
  allTodos:(state:State)=>state.todos
};

const actions ={
    async fetchTodos({commit}:any){
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        commit ('setTodos',response.data)
    },
    
    async addTodo({commit}:any,title:string){
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos',{title,completed:false})
        commit ('newTodo',response.data)
    },

    async deleteTodo ({commit}:any,id:number){
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        commit ('removeTodo',id)
    },

    async filterTodos({commit}:any,e:any){
    const limit = parseInt(
        e.target.options[e.target.options.selectedIndex].innerText
      );
  
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
      );
  
      commit('setTodos', response.data);
    },

    async updateTodo({ commit }:any, updTodo:User) {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
          updTodo
        );
        commit('updateTodo', response.data);
      }
}

  const mutations ={
    setTodos : (state:State,todos:User[]) =>(state.todos =todos),
    newTodo :(state:State,todo:User) =>state.todos.unshift(todo),
    removeTodo:(state:State,id:number)=>state.todos = state.todos.filter(each=>each.id!==id),
    updateTodo: (state:State, updTodo:User) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);
        if (index !== -1) {
          state.todos.splice(index, 1, updTodo);
        }
      }
}


export default {
    state,
    getters,
    actions,
    mutations
}