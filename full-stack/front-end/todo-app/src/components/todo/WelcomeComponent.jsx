import React, {Component} from 'react'
import {useParams, Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

//export default function WelcomeComponent() {
    //let {name} = useParams()
    //return (
       // <>
           // <h1>Welcome</h1>
           // <div className='container'>
           //     Hello {name}! You can manage your todos from <Link to='/todos'>here</Link>
           // </div>
       // </>
    //)
//}

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retriveMessage = this.retriveMessage.bind(this)
        this.successResponse = this.successResponse.bind(this)
        this.errorResponse = this.errorResponse.bind(this)
        this.state = {welcomeMessage : ''}
    }

    render() {
        return (
            <> 
                <h1>Welcome</h1>
                <div className='container'>
                    Your todos can be managed from <Link to='/todos'>here</Link>
                </div>
    
                <div className='container'>
                    Customized message below: 
                    <button onClick={this.retriveMessage} className='btn btn-success'>
                        Shown</button>
                </div>

                <div className='container'>
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    retriveMessage() {
        //HelloWorldService.executeHelloWorld()
        //.then(response => this.successResponse(response))
        HelloWorldService.executeHelloWorldBean()
        .then(response => this.successResponse(response))
        .catch(error => this.errorResponse(error))
    }
    successResponse(response) {
        //this.setState({welcomeMessage : response.data})
        this.setState({welcomeMessage : response.data.message})
    }
    errorResponse(error) {
        let errorMessage = ''

        if (error.message) {
            errorMessage += error.message
        }
        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        } 
        
        this.setState({welcomeMessage : errorMessage})
    }

}

export default WelcomeComponent

