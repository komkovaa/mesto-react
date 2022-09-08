import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <form className="popup__form">
                <button className="popup__close" type="button" aria-label="close" onClick={props.onClose}></button>
                <h2 className="popup__message">{props.title}</h2>
                {props.children}
                <button className="popup__submit" type="submit" value="Создать">{props.submit}</button>
            </form>
        </div>
    )
}

export default PopupWithForm;