// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data from JSON web token by decoding it
  getProfile() {
    return decode(this.getToken());
  }

  // return `true` or `false` if token exists (does not verify if it's expired yet)
  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  loginToken(idToken) {
    // Saves user token to localStorage and reloads the application for logged in status to take effect
    localStorage.setItem('id_token', idToken.token);
    localStorage.setItem('isOwner', idToken.userData.isOwner);
    localStorage.setItem('user_id', idToken.userData._id);
    localStorage.setItem('owner_id', idToken.userData.owner_id);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('isOwner');
    localStorage.removeItem('owner_id');
    // this will reload the page and reset the state of the application
    window.location.assign('/login');
  }
}

export default new AuthService();
