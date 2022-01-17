import React, {Component} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'


class LoginComponent extends Component {
    //define the initial default state for login
    constructor(props) {
        super(props)
        this.state = {
            username : 'tengxue',
            password : '',
            loginSuccess : false,
            loginFail : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    //update new state (username/password) once changed
    handleChange(event) {
        console.log(this.state)
        this.setState({[event.target.name] : event.target.value})
    }

    loginClicked() {
        if (this.state.username === 'tengxue' && this.state.password === 'dummy') {
            console.log('Success')
            AuthenticationService.registerSuccessLogin(this.state.username, this.state.password)
            this.props.navigate(`/welcome/${this.state.username}`)
            //this.setState({loginSuccess : true}
            //this.setState({loginFail : false})
        }
        else {
            console.log('Fail')
            this.setState({loginFail : true})
            this.setState({loginSuccess : false})
        }
    }

    //GUI view
    render() {
        return (
            <>
                <h1>Login</h1>
                <div className='container'>
                    {/*use "&&" operator as conditioner to show corresponding message*/}
                    {this.state.loginFail && <div className='alert alert-warning'>Invalid Credentials</div>}
                    {this.state.loginSuccess && <div>Login Successful</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className='btn btn-success' onClick={this.loginClicked}>Login</button>
                </div>
            </>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate()
    return <LoginComponent {...props} navigate={navigate}/>
}

export default WithNavigate