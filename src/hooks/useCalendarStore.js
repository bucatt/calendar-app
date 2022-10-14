import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertDateEvents } from '../helpers/convertDateEvents';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
  const { eventList, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async calendarEvent => {
    try {
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      //Creando
      const { data } = await calendarApi.post('/events', calendarEvent);
      console.log(data);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data?.msg, 'error');
    }
  };

  const startDeleteEvent = async () => {
    // const {data} = calendarApi.delete(`/events/${}`)

    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      // console.log(data);
      const events = convertDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
      console.log(events);
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  };

  return {
    eventList,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
