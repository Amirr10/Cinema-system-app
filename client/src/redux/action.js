
export function setUser(payload) {
    const action = {
      type: "SET_USER",
      payload
    };
    return action;
  }

export function setAllUsers(payload) {
    const action = {
      type: "SET_ALL_USERS",
      payload
    };
    return action;
  }