import React, { useState } from "react";

function Header() {
  const [inputValue, setInputValue] = useState('');
  const [state, setState] = useState([]);
  const [buttonConfig, setButtonConfig] = useState({ type: 'create', id: null });

  function TodoAction() {
    if (buttonConfig.type === "create") {
      store();
    } else if (buttonConfig.type === "update") {
      todoUpdate();
    }
  }

  function todoEdit(id) {
    let value = state.find(item => item.id === id);
    if (!value) {
      alert("Item not found");
      return;
    }
    setInputValue(value.label);
    setButtonConfig({ type: 'update', id: value.id });
  }

  function todoUpdate() {
    let updatedState = state.map(item => {
      if (item.id === buttonConfig.id) {
        item.label = inputValue;
      }
      return item;
    });

    setState(updatedState);
    resetForm();
  }

  function todoDelete(id) {
    let updatedState = state.filter(item => item.id !== id);
    setState(updatedState);
  }

  function store() {
    if (inputValue.trim() === "") {
      alert("Please enter a value");
      return;
    }
    setState([...state, {
      id: Date.now(),
      label: inputValue,
    }]);
    setInputValue('');
    resetForm();
  }

  function resetForm() {
    setInputValue('');
    setButtonConfig({ type: 'create', id: null });
  }

  return (
    <>
      <h1 className="display-4 text-center py-1">To-Do App</h1>

      <div className="jumbotron p-3 shadow-sm">
        <div className="d-flex align-items-center">
          <input 
            autoFocus 
            autoComplete="off" 
            className="form-control mr-3" 
            type="text" 
            style={{ flex: 1 }}
            onChange={(e) => setInputValue(e.target.value)} 
            value={inputValue}
          />
          <button 
            className="btn btn-primary"
            onClick={TodoAction}
          >
            {buttonConfig.type === 'create' ? 'Add New Item' : 'Update'}
          </button>
        </div>
      </div>

      <ul className="list-group pb-5">
        {state.map((item) => (
          <li 
            className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
            key={item.id}
          >
            {item.label}
            <div>
              <button 
                className="edit-me btn btn-secondary btn-sm mr-1" 
                onClick={() => todoEdit(item.id)}
              >
                Edit
              </button>
              <button 
                className="delete-me btn btn-danger btn-sm" 
                onClick={() => todoDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Header;