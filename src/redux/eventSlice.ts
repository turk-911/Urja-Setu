import { Event } from '@/types/event';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  events: [] as Event[],
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
        state.events = action.payload;
        console.log(state.events)
    },
    removeEvent: (state, action: PayloadAction<string>) => {
        const eventIdToDelete = action.payload;
        state.events = state.events.filter((event) => event.id !== eventIdToDelete);
    },
    updateEvent: (state, action: PayloadAction<Partial<Event>>) => {
        const updatedEvent = action.payload;
        const index = state.events.findIndex((event) => event.id === updatedEvent.id);

        if(index !== -1){
            state.events[index] = { ...state.events[index], ...updatedEvent };
            // console.log("Updated event: ", state.events[index]);
        }
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      console.log("Added event: ", action.payload);
    },
  },
});

export const { setEvents, removeEvent, updateEvent, addEvent } = eventSlice.actions;

export default eventSlice.reducer;