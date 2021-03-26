import React from 'react';

function DeleteButton(props) {
  return (
    <button type="button" className="btn btn-white">
      <Delete className="pb-1" onClick={() => remove(subsidizeIdx)} style={{ color: 'red' }} />
    </button>
  );
}

export default DeleteButton;
