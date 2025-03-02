import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import calendarApi from "../api/calendarApi"
import { convertEventsToDateEvents } from "../helpers"
import Swal from "sweetalert2"

export const useCalendarStore = () => {
    const {
        events,
        activeEvent
    } = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        //TOdo Udate event

        //todo bien

        try {
            if (calendarEvent.id){
                //actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}))
                return
            }

            const {data} = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))
            
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg)
        }
    }

    const startDeletingEvent = async (calendarEvent) => {
        try {
            await calendarApi.delete(`/events/${calendarEvent.id}`)
            dispatch(onDeleteEvent())
            
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data.msg)
        }

    }


    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events))
            console.log(events)
        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }

    return {
        //* propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //* metodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents
    }
}