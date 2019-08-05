import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../actions';
import './ListTodo.css';

const ListTodo = ({ items, removeTodo, toggleTodo }) => {
  const removeHandler = (e, id) => {
    e.stopPropagation();
    removeTodo(id);
  };
  const toggleHandler = (e, todo) => {
    e.stopPropagation();
    toggleTodo(todo);
  };

  return (
    <div>
      <ul className="list-group">
        {
          items.map((item, index) => {
            const { id, content, completed } = item;
            return (
              <li className={completed ? "list-group-item active" : "list-group-item"} key={index} onClick={e => toggleHandler(e, item)}>
                <span className="todo-content">{content}</span>
                <button className="badge badge-danger" onClick={e => removeHandler(e, id)}>remove</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state.todo.items
});

const mapDispatchToProps = (dispatch) => ({
  removeTodo: (id) => dispatch(Actions.removeTodo(id)),
  toggleTodo: (todo) => dispatch(Actions.toggleTodo(todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTodo);
