import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import TodoService from '../../api/todo/TodoService.js'
import AuthenticationService from './AuthenticationService.js'


class TodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos : [],
                //[{description: 'Learn React', done: false, targetDate: new Date()},
                //{description: 'Learn Spring Boot', done: false, targetDate: new Date()},
                //{description: 'Learn LeetCode', done: false, targetDate: new Date()}]
            message : null
        }
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.createTodo = this.createTodo.bind(this)
    }

    //default React method (no need to bind): call the backend API to retriveAllTodos while mounting
    componentDidMount() {
       this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUsername()
        TodoService.retriveAllTodos(username)
        .then(response => {
                this.setState({todos : response.data})
        })
    }

    updateTodo(id) {
        this.props.navigate(`/todos/${id}`)
    }

    createTodo() {
        this.props.navigate(`/todos/-1`)
    }

    deleteTodo(id) {
        let username = AuthenticationService.getLoggedInUsername()
        TodoService.deleteTodo(username, id)
        .then(response => {
                this.setState({message : `Delete of todo ${id} was successful`})
                this.refreshTodos()
            }
        )
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {/*only show this alret message when the message is not null*/}
                {this.state.message && <div className='alert alert-warning'>{this.state.message}</div>}
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Done?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                    todo => 
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className='btn btn-success' onClick={() => this.updateTodo(todo.id)}>
                                                Update</button>
                                            </td>
                                            <td><button className='btn btn-warning' onClick={() => this.deleteTodo(todo.id)}>
                                                Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className='row'>
                        <button className='btn btn-success' onClick={this.createTodo}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate()
    return <TodosComponent {...props} navigate={navigate}/>
}

export default WithNavigate