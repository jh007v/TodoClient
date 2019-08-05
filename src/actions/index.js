import { ActionTypes } from '../contants';

const getClientToken = () => {
  const formData = new FormData();
  formData.append('grant_type', 'client_credentials');

  return ({
    type: ActionTypes.GET_TOKEN,
    payload: {
      request: {
        method: 'POST',
        url: '/oauth/token',
        data: formData
      }
    }
  });
};

const signup = ({ username, password, email, firstName, lastName }) => {
  return ({
    type: ActionTypes.SIGNUP,
    payload: {
      request: {
        method: 'POST',
        url: '/signup',
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ username, password, email, firstName, lastName })
      }
    }
  });
};

const login = (username, password) => {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('username', username);
  formData.append('password', password);

  return ({
    type: ActionTypes.LOGIN,
    payload: {
      request: {
        method: 'POST',
        url: '/oauth/token',
        data: formData
      }
    }
  });
};

const getUserMe = () => {
  return ({
    type: ActionTypes.GET_USERME,
    payload: {
      request: {
        method: 'GET',
        url: '/users/me'
      }
    }
  });
};

const logout = () => ({
  type: ActionTypes.LOGOUT
});

const refreshToken = (refresh_token) => {
  const formData = new FormData();
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', refresh_token);

  return ({
    type: ActionTypes.REFRESH_TOKEN,
    payload: {
      request: {
        method: 'POST',
        url: '/oauth/token',
        data: formData
      }
    }
  });
};

const addTodo = (content) => {
  return ({
    type: ActionTypes.ADD_TODO,
    payload: {
      request: {
        method: 'POST',
        url: '/todo',
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ content: content, completed: false })
      }
    }
  });
};

const fetchTodo = (page = 1, size = 10) => {
  return ({
    type: ActionTypes.FETCH_TODO,
    payload: {
      request: {
        method: 'GET',
        url: `/todo?page=${page}&size=${size}`
      }
    }
  });
};

const removeTodo = (id) => {
  return ({
    type: ActionTypes.REMOVE_TODO,
    payload: {
      request: {
        method: 'DELETE',
        url: `/todo/${id}`
      }
    }
  });
};

const toggleTodo = (todo) => {
  return ({
    type: ActionTypes.TOGGLE_TODO,
    payload: {
      request: {
        method: 'PATCH',
        url: `/todo/${todo.id}`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ ...todo, completed: !todo.completed })
      }
    }
  });
};

export const Actions = {
  addTodo,
  fetchTodo,
  getClientToken,
  getUserMe,
  login,
  logout,
  refreshToken,
  removeTodo,
  signup,
  toggleTodo
};
