import Logo from '../images/Logo.svg';

function Headers () {
    return (
        <header className="header">
          <img className="logo" src={Logo} alt="логотип" />
        </header>
    )
}

export default Headers;