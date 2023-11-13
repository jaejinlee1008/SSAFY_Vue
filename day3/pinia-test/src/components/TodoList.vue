<script setup>
import { storeToRefs } from 'pinia'
import { useTodoListStore } from '../stores/todoStore';
import { ref, computed } from 'vue'

const store = useTodoListStore();
const { addTodo, deleteTodo, toggleTodo } = store //action
const { todoList, doneCount } = storeToRefs(store);

const todo = ref('')
function newTodo() {
    addTodo(todo.value)
    todo.value = ''
}



</script>
<template>
    <div>
        <h2>TodoList 테스트(Composition API)</h2>
        <hr />
        <div class="form-group">
            <label>할일 추가:</label>
            <input type="text" class="form-control" v-model="todo" @keyup.enter="newTodo" />
        </div>
        <hr />

        <div id="app">
            <label>할일 리스트</label>
            <div class="greetings">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th class="text-center">I D</th>
                            <th class="text-center">할일</th>
                            <th class="text-center">완료여부</th>
                            <th class="text-center">삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="c in todoList" :key="c.id">
                            <td v-if="c.done">
                                <input type="checkbox" checked :value="c.id" @change="toggleTodo(c.id)">
                            </td>
                            <td v-else>
                                <input type="checkbox" :value="c.id" @change="toggleTodo(c.id)">
                            </td>
                            <td>{{ c.id }}</td>
                            <td :class="{ 'linethru': c.done }">{{ c.todo }}</td>
                            <td>{{ c.done == false ? 'X' : 'O' }}</td>
                            <td><button @click="deleteTodo(c.id)">삭제</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="form-group">
            <label>완료된 할일 수: {{ doneCount }}</label>
        </div>
    </div>
</template>
<style>
.linethru {
    text-decoration: line-through;
}
</style>