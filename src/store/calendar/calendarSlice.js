import { createSlice } from '@reduxjs/toolkit';

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: 'My Event',
//   notes: 'heyy',
//   start: new Date(),
//   end: new Date(),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'wantán',
//   },
// };

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    eventList: [
      /*tempEvent*/
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.eventList.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.eventList = state.eventList.map(event => {
        if (event.id === payload.id) {
          // Si se encuentra el evento
          return payload;
        }
        // Si no se encuentra el evento
        return event;
      });
      console.log(state.eventList);
    },
    onDeleteEvent: state => {
      if (state.activeEvent) {
        state.eventList = state.eventList.filter(
          event => event.id !== state.activeEvent.id,
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.eventList = payload;
      payload.forEach(event => {
        const exists = state.eventList.some(dbEvent => dbEvent.id === event.id);
        if (!exists) {
          state.eventList.push(event);
        }
      });
    },
    onLogoutCalendar: state => {
      state.isLoadingEvents = true;
      state.eventList = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
