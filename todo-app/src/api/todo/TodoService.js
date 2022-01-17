import axios from "axios"

class TodoService {
    retriveAllTodos(name) {
        return axios.get(`http://localhost:8080/jpa/users/${name}/todos`)
    }

    retriveTodo(name, id) {
        return axios.get(`http://localhost:8080/jpa/users/${name}/todos/${id}`)
    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:8080/jpa/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {
        return axios.put(`http://localhost:8080/jpa/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        return axios.post(`http://localhost:8080/jpa/users/${name}/todos`, todo)
    }
}

export default new TodoService()