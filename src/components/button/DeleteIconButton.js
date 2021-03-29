import { Delete } from '@material-ui/icons';
import React from 'react';

const DeleteIconButton = ({ onClick, color }) => {
  return (
    <div role="button" className="pt-1 d-inline">
      <Delete className="pb-1" onClick={onClick} style={{ color: color ?? 'red' }} />
    </div>
  );
};

export default DeleteIconButton;
