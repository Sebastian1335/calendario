import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";


import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useState } from "react";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";



export const CalendarPage = () => {
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
    const {openDateModal} = useUiStore()
    const {
        events,
        activeEvent,
        setActiveEvent
    } = useCalendarStore()
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: "#347CF7",
            borderRadius: "0px",
            opacity: 0.8,
            color: "white",
        };
        return {
            style,
        };
    };

    const onDoubleClick = (event) => {
        openDateModal()
    };

    const onSelect = (event) => {
        // console.log({ click: event });
        setActiveEvent(event)
    };

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event)
    };
    return (
        <>
            <NavBar />
            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc( 100vh - 80px )" }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
            <CalendarModal/>
            <FabAddNew/>
            <FabDelete/>
        </>
    );
};
