import React from 'react';
import { connect } from "react-redux";
import AddTodo from '../components/AddTodo';
import ListTodo from '../components/ListTodo';
import { Actions } from '../actions';
import './Todo.css';

const Todo = ({ fetchTodo }) => {
  // fetchTodo();

  return (
    <div className="Todo">
      <div className="content">
        <AddTodo />
        <ListTodo />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchTodo: (page, size) => dispatch(Actions.fetchTodo(page, size))
});

export default connect(null, mapDispatchToProps)(Todo);
