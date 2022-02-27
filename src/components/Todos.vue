<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    </div>
    <div class="todos">
      <div
        @dblclick="onDblClick(todo)"
        v-for="todo in allTodos"
        :key="todo.id"
        class="todo"
        :class ="[todo.completed ? 'is-complete' : 'todo']"
      >
        {{ todo.title }}
        <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from "vue";
import store from '@/store'
import User from '@/types/User'

export default defineComponent({
   name: "AllTodos",
    setup() {
        const allTodos = computed(()=>store.getters.allTodos)

        const deleteTodo=(id:number)=>{
            store.dispatch('deleteTodo',id)
        }

        const onDblClick=(todo:User)=>{
                const updTodo:User={
                    id:todo.id,
                    title:todo.title,
                    completed:!todo.completed
                }
                store.dispatch('updateTodo',updTodo)
        } 
        const fetchTodos=()=>{
                store.dispatch('fetchTodos')
        }
        return {allTodos,deleteTodo,onDblClick,fetchTodos}
    },
    created(){
        this.fetchTodos()
    }
})
 </script>



<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}

.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}

.is-complete {
  background: #35495e;
  color: #fff;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
