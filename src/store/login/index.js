import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    return {
      login: '',
      password: '',
      error: '',
      user: {},
      isAuth: false,
      isLoad: false
    }
  }

  handleChange(value, name) {
    this.setState({
      ...this.getState(),
      [name]: value
    })
  }


  async logOut() {
    const token = localStorage.getItem('token')
    await fetch('api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        "X-Token": token,
        "Content-Type": "application/json",
      },
    })
    this.setState({
      ...this.getState(),
      isAuth: false
    })
    localStorage.removeItem('token')
  }

  async autoLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('api/v1/users/self?fields=*', {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json"
        }
      })
      const json = await response.json()
      this.setState({
        ...this.getState(),
        isAuth: true,
        user: json.result,
      })
    }

  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({
      ...this.getState(),
      error: '',
      isLoad: true
    })
    const response = await fetch('api/v1/users/sign', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "login": this.getState().login,
        "password": this.getState().password
      })
    })
    const json = await response.json();

    if (response.status === 200) {
      localStorage.setItem('token', json.result.token)
      this.setState({
        ...this.getState(),
        login: '',
        password: '',
        user: json.result.user,
        isAuth: true,
        isLoad: false
      })
    } else {
      this.setState({
        ...this.getState(),
        error: json.error.message,
        password: '',
        isLoad: false
      })
    }
  }
}

export default LoginState;