import axios from "axios"

class HelloWorldService {
    executeHelloWorld() {
        return axios.get('http://localhost:8080/hello-world')
    }
    executeHelloWorldBean() {
        let username = 'tengxue'
        let password = 'dummy'
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        return axios.get('http://localhost:8080/hello-world-bean',
                        {
                            headers : {
                                authorization: basicAuthHeader
                            }
                        })
    }
}

export default new HelloWorldService()