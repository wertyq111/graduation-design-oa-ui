<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :title_id="title_id" @addTodo="addTodo"/>
        <MyList :todos="todos" />
        <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo" />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "./my-header";
import MyList from "./my-list";
import MyFooter from "./my-footer";

export default {
  name: "Todo",
  components: {MyHeader, MyList, MyFooter},
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  computed: {
    title_id() {
      return String(this.todos.length+1).padStart(3, '0');
    }
  },
  watch:{
    todos: {
      deep:true,
      handler(value) {
        localStorage.setItem('todos', JSON.stringify(value))
      }
    }
  },
  methods: {
    // 添加todo
    addTodo(todo) {
      this.todos.unshift(todo);
    },
    // 选中 or 取消todo
    checkTodo(id) {
      this.todos.forEach((todo)=>{
        if(todo.id === id) {
          todo.done = !todo.done
        }
      })
    },
    // 编辑todo
    editTodo(id, title) {
      this.todos.forEach((todo)=>{
        if(todo.id === id) {
          todo.title = title
        }
      })
    },
    // 删除todo
    deleteTodo(id) {
      this.todos = this.todos.filter((todo)=> todo.id !== id)
    },
    // 全选todo
    checkAllTodo(value) {
      this.todos.forEach((todo) => todo.done = value)
    },
    // 清除已完成
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => !todo.done)
    }
  },
  mounted() {
    this.$bus.$on('checkTodo', this.checkTodo)
    this.$bus.$on('editTodo', this.editTodo)
    this.$bus.$on('deleteTodo', this.deleteTodo)
  },
  beforeDestroy() {
    this.$bus.$off('checkTodo')
    this.$bus.$off('editTodo')
    this.$bus.$off('deleteTodo')
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: #69c0ff;
  border: 1px solid #1c6ca1;
  margin-right: 5px;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
h1{
  background-color: orange;
}
</style>
