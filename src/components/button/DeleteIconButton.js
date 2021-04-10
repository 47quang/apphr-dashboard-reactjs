import { Delete } from '@material-ui/icons';
import React from 'react';
import { joinClassName } from 'src/utils/stringUtils';

const DeleteIconButton = ({ className, onClick, color }) => {
  return (
    <div role="button" className={joinClassName([className ?? 'pt-2', 'd-flex align-items-center', 'mt-4'])}>
      <Delete className="p-1 bg-danger rounded" onClick={onClick} style={{ color: color ?? 'white' }} />
    </div>
  );
};

export default DeleteIconButton;
