import React, { useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';

// import { addHours } from "date-fns/esm";
import { NavBar, CalendarEvent, CalendarModal } from '../components/';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';

import { localizer, getMessagesES } from '../../helpers';
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';

export const CalendarPage = () => {
  const { user } = useAuthStore();

  const { openDateModal } = useUiStore();

  const { eventList, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week',
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });
    console.log(event);

    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    console.log(event.user._id);
    console.log(user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  };

  const onDoubleClick = () => {
    // console.log({ doubleClick: event })
    openDateModal();
  };

  const onSelect = event => {
    // console.log({ click: event })
    setActiveEvent(event);
  };

  const onViewChanged = event => {
    console.log({ viewChanged: event });
    localStorage.setItem('lastView', event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={eventList}
        defaultView={lastView}
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        s
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />

      <FabDelete />
    </>
  );
};
