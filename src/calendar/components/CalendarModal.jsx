import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
    const [isOpen, setIsOpen] = useState(true)

    const onCloseModal = () => {
        setIsOpen(false)
        console.log('cerrando modal')
    }
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1>hola Mundo</h1>
            <hr />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat at accusamus ex amet atque ut consequatur veritatis unde aliquid error harum saepe, voluptatibus quas commodi cum cupiditate et possimus suscipit?</p>
        </Modal>
    );
};
