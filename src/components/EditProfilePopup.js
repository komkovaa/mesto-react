import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    //Подписываемся на контекст, чтобы подставить в форму текущие значения
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);
    
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='edit' title='Редактировать профиль' button='Сохранить' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
            <input id='name-input' className="popup__desc" name="profileName" type="text" placeholder="Укажите Имя"
                required defaultValue={name} onChange={handleChangeName} />
            <span className="name-input-error popup__desc-error">Вы пропустили это поле.</span>
            <input id='job-input' className="popup__desc" name="placeLink" type="text"
                placeholder='Укажите род деятельности' required defaultValue={description} onChange={handleChangeDescription} />
            <span className="job-input-error popup__desc-error">Вы пропустили это поле.</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;