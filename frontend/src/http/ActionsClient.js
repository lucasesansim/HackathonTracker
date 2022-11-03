
import store from "../store/store";
import AbstractRestClient from "./AbstractRestClient";

class ActionsRestClient extends AbstractRestClient {
  // In case actions need this in the future, it is good to hoist and have access to user data from here.
  getUser = () => store.getState().auth.user.id;

  getUserObject = () => store.getState().auth.user;

  register(newUser) {
    return this.instance.post(
      `/api/register`, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      }
    );
  }

  login(user) {
    return this.instance.post(
      `/api/login`, {
        email: user.email,
        password: user.password,
      }
    );
  }

  logout() {
    return this.instance.post(`/api/logout`);
  }

  listHackathons(page, pageSize) {
    return this.instance.get(`/api/hackathons`, { params: { page, pageSize } });
  }

  getHackathon(hackathonId) {
    return this.instance.get(`/api/hackathons/${hackathonId}`);
  }

  listTopDevelopers() {
    return this.instance.get(`/api/topTenDevelopers`);
  }
}

export default new ActionsRestClient();