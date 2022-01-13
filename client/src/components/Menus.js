import React from 'react'
// import Submenus from './Submenus'
import { Link } from 'react-router-dom'

function Menus({ menu, submenus, link }) {
    return (
        <Link to={`/coursesInfo/${link}`} className="dropdown__info">
            <div className="dropdown__names">{menu}</div>
            {/* <span>{">"}</span>
            <div className="submenu__content">
                {submenus?.map(submenu => (
                    <Submenus key={submenu.id} submenu={submenu.submenu} />
                ))}
            </div> */}
        </Link>
    )
}

export default Menus
