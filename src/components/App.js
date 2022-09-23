import React from "react";
import api from "../utils/Api";
import Headers from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

  //переменные состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  //стейт для данных из Api
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  //эффект при монтировании
  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
  }, [])

  
  useEffect(() => {
      api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch((err) => console.log(err))
  }, []);

  //При клике на лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
    .changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err))
}

//При клике на корзину
function handleCardDelete(deletedCard) {
    api
    .deleteCard(deletedCard._id)
    .then(() => {
        const newArr = cards.filter(c => c._id !== deletedCard._id);
        setCards(newArr);
    })
    .catch((err) => console.log(err))
}

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

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editingUserInfo(data)
    .then((data) => {
      setCurrentUser(data);
      setIsLoading(false);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.changeAvatar(data)
    .then((data) => {
      setCurrentUser(data);
      setIsLoading(false);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    api.createNewCard(newCard)
    .then((newCard) => {
      setCards([newCard,...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  return (
    // Компонент Provider используется для передачи текущего
    // аутентифицированного пользователя вниз по дереву. Любой компонент может использовать
    // этот контекст и не важно, как глубоко он находится.
    // Мы передаём "currentUser" в качестве значения контекста.
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Headers />
        <Main
          onEditProfile={handleEditProfileClick} //передаем обработчики с помощью пропса, вызывваем в main.js
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}>
          
        </EditAvatarPopup>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm isOpen={false} onClose={closeAllPopups} name="confirm" title="Вы уверены?" button="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
