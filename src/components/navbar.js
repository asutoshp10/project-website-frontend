import React from 'react'

function Navbar({onToggleTheme}){
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Asutosh</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#home">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#resume_scorer">Resume-scorer</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#cnn">CNN</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="https://asutoshp10.github.io/Portfolio-Website/#main" target='blank'>Portfolio Website</a>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => onToggleTheme('light')}>Day Mode</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => onToggleTheme('dark')}>Night Mode</a></li>
                    {/* <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                </ul>
                </li>
            </ul>
            {/* <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            </div>
        </div>
</nav>
    )
}

export default Navbar