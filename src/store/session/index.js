import StoreModule from "../module";

class sessionState extends StoreModule {

  initState() {
    return {
      error: [],
      user: {},
      isAuth: false,
      isLoad: false,
      hasToken: localStorage.getItem('token') ? true : false
    }
  }

  refreshErrors() {
    this.setState({
      ...this.getState(),
      error: []
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
      isAuth: false,
      hasToken: false,
      user: {}
    })
    localStorage.removeItem('token')
  }

  async autoLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        ...this.getState(),
        isLoad: true,
      })
      const response = await fetch('api/v1/users/self?fields=*', {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json"
        }
      })
      const json = await response.json();
      this.setState({
        ...this.getState(),
        isLoad: false,
        isAuth: true,
        user: json.result,
      })
    }
    this.setState({
      ...this.getState(),
      isLoad: false,
    })

  }

  async onSubmit(e, login, password) {
    e.preventDefault();
    this.setState({
      ...this.getState(),
      error: [],
      isLoad: true
    })
    const response = await fetch('api/v1/users/sign', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "login": login,
        "password": password
      })
    })
    const json = await response.json();
    if (response.status === 200) {
      localStorage.setItem('token', json.result.token)
      this.setState({
        ...this.getState(),
        hasToken: true,
        user: json.result.user,
        isAuth: true,
        isLoad: false
      })
    } else {
      this.setState({
        ...this.getState(),
        error: json.error.data.issues.map((item) => item.message),
        password: '',
        isLoad: false
      })
    }
  }
}

export default sessionState;