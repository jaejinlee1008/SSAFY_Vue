import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

const useTodoListStore = defineStore('todoList', () => {
    //1.state(data)
    const id = ref(5)
    const state = reactive({
        todoList: [
            { id: 1, todo: "ES6학습", done: false },
            { id: 2, todo: "React학습", done: false },
            { id: 3, todo: "ContextAPI 학습", done: true },
            { id: 4, todo: "야구경기 관람", done: false },
        ]
    })
    //2.getter-computed
    const todoList = computed(() => state.todoList)
    const doneCount = computed(() => {
        return state.todoList.filter((todoItem) => todoItem.done == true).length
    })


    //3.action
    const addTodo = (todo) => {
        state.todoList.push({ id: id.value++, todo, done: false })
    }
    const deleteTodo = (param) => {
        let index = state.todoList.findIndex((todoItem) => { return todoItem.id === param })
        console.log();
        state.todoList.splice(index, 1) //index 위치 부터 1개 삭제
    }
    const toggleTodo = (param) => {
        let index = state.todoList.findIndex((todoItem) => { return todoItem.id === param })
        state.todoList[index].done = !state.todoList[index].done;
    }


    return {
        addTodo, deleteTodo, todoList, doneCount, toggleTodo
    }
})
export { useTodoListStore }