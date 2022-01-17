import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginComponent from './LoginComponent'
import WelcomeComponent from './WelcomeComponent'
import TodosComponent from './TodosComponent'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import NewTodoComponent from './NewTodoComponent'
import AuthenticatedRoute from './AuthenticatedRoute'


class TodoApp extends Component {
    render() {
        return (
            <div className='TodoApp'>
                {/*<h1>TODO Management</h1>*/}
                <Router>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}/>
                        <Route path='*' element={<ErrorComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/welcome/:name' element={<WelcomeComponent/>}/>
                        <Route path='/todos/:id' element={<NewTodoComponent/>}/>
                        <Route path='/todos' element={<TodosComponent/>}/>
                        <Route path='/logout' element={<LogoutComponent/>}/>
                    </Routes>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}


function ErrorComponent() {
    return <div>Error 404, please try it again later!</div>
}


export default TodoApp


