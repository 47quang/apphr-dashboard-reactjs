import { Delete } from '@material-ui/icons';
import React from 'react';
import { joinClassName } from 'src/utils/stringUtils';

const DeleteIconButton = ({ className, onClick, color }) => {
  return (
    <div role="button" className={joinClassName([className ?? 'pt-1', 'd-flex align-items-end'])}>
      <Delete className="pb-1" onClick={onClick} style={{ color: color ?? 'red' }} />
    </div>
  );
};

export default DeleteIconButton;
