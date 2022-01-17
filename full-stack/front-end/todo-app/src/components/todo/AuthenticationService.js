import axios from "axios"

class AuthenticationService {
    registerSuccessLogin(username, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(basicAuthHeader)
    }

    setupAxiosInterceptors(basicAuthHeader) { 
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return false
        return true
    }

    getLoggedInUsername() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return ''
        return user
    }
}

export default new AuthenticationService