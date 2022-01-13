import React from 'react'
import Menus from './Menus'

function HeaderMenus({ name, menus }) {
    return (
        <div className="title__mainContainer">
            <div className="title__container" id={name}>
                {name}
            </div>
            <div className="dropdown__content">
                {menus?.map(dropdowMenus => (
                    <Menus key={dropdowMenus.id} menu={dropdowMenus.menu} submenus={dropdowMenus.submenus} link={dropdowMenus.link} />
                ))}
            </div>
        </div>
    )
}

export default HeaderMenus
