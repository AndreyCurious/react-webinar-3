import StoreModule from "../module";

class Profile extends StoreModule {

  initState() {
    return {
      user: {},
    }
  }


  async fetchUser() {
    const token = localStorage.getItem('token');
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
      user: json.result,
    })
  }
}

export default Profile;