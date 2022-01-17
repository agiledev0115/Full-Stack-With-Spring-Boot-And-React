import React, {Component} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TodoService from '../../api/todo/TodoService.js'
import AuthenticationService from './AuthenticationService'


class NewTodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //id : this.props.params.id **Not sure how to useParams in React v6**
            id : 1,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    //default React method (no need to bind): call the backend API to retriveTodo while mounting
    componentDidMount() {
        if (this.state.id == -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUsername()
        TodoService.retriveTodo(username, this.state.id)
        .then(response => {
            this.setState({description: response.data.description,
                        targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')})
        })
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUsername()
        let todo = {id: this.state.id, 
                    description: values.description, 
                    targetDate: values.targetDate}

        if (this.state.id == -1) {
            //create a new todo
            TodoService.createTodo(username, todo)
            .then( () => this.props.navigate('/todos') )
        }
        else {
            //update an existed todo
            TodoService.updateTodo(username, this.state.id, todo)
            .then( () => this.props.navigate('/todos') )
        }
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Please enter a description'
        }
        else if (values.description.length < 5) {
            errors.description = 'Please enter a description with at least 5 characters'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Please enter a valid date'
        }
        return errors
    }

    render() {
        let {description, targetDate} = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className='container'>
                    <Formik initialValues = {{description, targetDate}}
                            onSubmit = {this.onSubmit}
                            validateOnBlur = {false}
                            validateOnChange = {false}
                            validate = {this.validate}
                            enableReinitialize = {true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name='description' component='div' 
                                        className='alert alert-warning'/>

                                    <ErrorMessage name='targetDate' component='div'
                                        className='alert alert-warning'/>

                                    <fieldset className='form-group'>
                                        <label>Description</label>
                                        <Field className='form-control' type='text' name='description'/>
                                    </fieldset>

                                    <fieldset className='form-group'>
                                        <label>Target Date</label>
                                        <Field className='form-control' type='text' name='targetDate'/>
                                    </fieldset>

                                    <button className='btn btn-success' type='submit'>Save</button>
                                </Form>
                            )
                        }
                
                    </Formik>
                </div>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate()
    return <NewTodoComponent {...props} navigate={navigate}/>
}

export default WithNavigate
