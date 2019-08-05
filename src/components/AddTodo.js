import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../actions';
import './AddTodo.css';

const AddTodo = ({ addTodo }) => {
  // Callback Refs
  let textInput;

  const onSubmit = (e) => {
    e.preventDefault();
    const content = textInput.value.trim();
    if (content.length > 0) {
      addTodo(content);
    }
    textInput.value = '';
  };

  return (
    <div className="AddTodo">
      <form onSubmit={e => onSubmit(e)}>
        <div className="input-group mb-3">
          <input type="text" ref={(element) => textInput = element} className="form-control" placeholder="할일을 입력하세요" />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="submit">ADD</button>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: (content) => dispatch(Actions.addTodo(content))
});

export default connect(null, mapDispatchToProps)(AddTodo);
