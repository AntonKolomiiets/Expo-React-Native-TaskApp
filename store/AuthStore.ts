import { types, flow } from 'mobx-state-tree';
import * as SecureStore from 'expo-secure-store';
import { signup, login } from '../api/AuthApi';

const AuthStore = types
  .model('AuthStore', {
    token: types.maybe(types.string),
    username: types.maybe(types.string),
  })
  .actions((self) => ({
    signup: flow(function* (username: string, password: string) {
      try {
        const data = yield signup(username, password);
        self.token = data.token;
        self.username = username;
        yield SecureStore.setItemAsync('token', data.token); // Save token securely
      } catch (error) {
        console.error('Signup failed:', error);
      }
    }),
    login: flow(function* (username: string, password: string) {
      try {
        const data = yield login(username, password);
        self.token = data.token;
        console.log(self.token)
        self.username = username;
        console.log(self.username)
        yield SecureStore.setItemAsync('token', data.token); // Save token securely
      } catch (error) {
        console.error('Login failed:', error);
      }
    }),
    logout: flow(function* () {
      try {
        self.token = undefined;
        self.username = undefined;
        yield SecureStore.deleteItemAsync('token'); // Remove token securely
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }),
    setToken: flow(function* () {
      try {
        const token = yield SecureStore.getItemAsync('token');
        self.token = token;
      } catch (error) {
        console.error('Failed to set token:', error);
      }
    }),
  }));

export default AuthStore;
