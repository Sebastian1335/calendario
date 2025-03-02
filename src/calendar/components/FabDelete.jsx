import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
    const {startDeletingEvent, hasEventSelected, activeEvent} = useCalendarStore()
    const handleDelete = () => {
        startDeletingEvent(activeEvent)
    }
    return (
        <button 
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className="fa fa-trash-alt"></i>
        </button>
    );
};
