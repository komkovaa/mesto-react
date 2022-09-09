import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {

    //Стейты для данных из API
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    //эффект, вызываемый при монтировании компонента, который совершает запрос в API за пользовательскими данными
    // и полученные данные передает в соответствующие переменные состояния
    useEffect(() => {
        api
            .getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar)
            })
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        api
        .getInitialCards()
        .then((data) => setCards(data))
        .catch((err) => console.log(err))
    }, []);
    


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__person">
                    <button className="profile__avatar-container" type='button' onClick={props.onEditAvatar}>
                        <img className="profile__avatar" src={`${userAvatar}`} alt="Аватар"  />
                    </button>
                    <div className="profile__info">
                        <div className="profile__block">
                            <h1 className="profile__name">{`${userName}`}</h1>
                            <button className="profile__edit-button" type="button" aria-label="edit" onClick={props.onEditProfile}></button>
                        </div>
                        <h2 className="profile__job">{`${userDescription}`}</h2>
                    </div>
                </div>
                <button className="profile__place-add-button" type="button" aria-label="add-element" onClick={props.onAddPlace}></button>
            </section>

            <ul className="elements-list">
                {cards.map((card) => 
                    {return (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
                        );
                    })}
            </ul>

        </main>
    )
}

export default Main;