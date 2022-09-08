import React from "react";
import Headers from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from 'react';

function App() {

  //переменные состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  //Обработчики попапов
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }
  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleCardClick(res) { setSelectedCard(res) }

  return (
    <div className="page">
      <div className='container'>
        <Headers />
        <Main
          onEditProfile={handleEditProfileClick} //передаем обработчики с помощью пропса, вызывваем в main.js
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm name='edit' title='Редактировать профиль' submit='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input id='name-input' className="popup__desc" name="profileName" type="text" placeholder="Укажите Имя"
            required />
          <span className="name-input-error popup__desc-error">Вы пропустили это поле.</span>
          <input id='job-input' className="popup__desc" name="placeLink" type="text"
            placeholder='Укажите род деятельности' required />
          <span className="job-input-error popup__desc-error">Вы пропустили это поле.</span>
        </PopupWithForm>

        <PopupWithForm name='avatar' title='Обновить аватар' submit='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input id='avatar-input' className="popup__desc" name="placeLink" type="url"
            placeholder='Ссылка на аватар' required />
          <span className="avatar-input-error popup__desc-error">Введите адрес сайта.</span>
        </PopupWithForm>

        <PopupWithForm name='addplace' title='Новое место' submit='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input id='title-input' className="popup__desc" name="placeName" type="text" placeholder="Название"
            required />
          <span className="title-input-error popup__desc-error">Вы пропустили это поле.</span>
          <input id='link-input' className="popup__desc" name="placeLink" type="url"
            placeholder='Ссылка на картинку' required />
          <span className="link-input-error popup__desc-error">Введите адрес сайта.</span>
        </PopupWithForm>

        <PopupWithForm isOpen={false} onClose={closeAllPopups} name="confirm" title="Вы уверены?" submit="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </div>
  );
}

export default App;
