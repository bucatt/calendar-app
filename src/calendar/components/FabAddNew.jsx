import React from 'react';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';

export const FabAddNew = () => {
  const { setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const onClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: new Date(),
      bgColor: '#fafafa',
      user: {
        id: '123',
        name: 'wantán',
      },
    });
    openDateModal();
  };

  return (
    <button onClick={onClickNew} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};
