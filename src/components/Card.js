function Card (props) {

    function handleClick() {
        props.onCardClick({ name: props.card.name, link: props.card.link });
      }  

    return (
            <li className="element">
                <img className="element__image" src={props.card.link} alt={`Картинка ${props.card.name}`} onClick={handleClick}/>
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__like-section">
                    <button className="element__chosen" type="button"></button>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
                <button className="element__basket" type="button"></button>
            </li>
    )
}

export default Card;