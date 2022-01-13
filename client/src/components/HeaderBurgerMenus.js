import React, { useState } from 'react'
import BurgerMenus from './BurgerMenus'

function HeaderBurgerMenus({ name, menus, showBM }) {
    const [showMiniBM, setShowMiniBM] = useState(false);

    const miniBM = () => {
        setShowMiniBM(!showMiniBM);
    }

    return (
        <div className="hbm">
            <div className={`hbm__container ${showMiniBM && "hbm__containerColor"}`} id={name} onClick={miniBM}>
                {name}
            </div>
            <div className={`hbm__dropdown ${showMiniBM && "hbm__dropdownShow"}`}>
                {menus?.map(dropdowMenus => (
                    <BurgerMenus key={dropdowMenus.id} menu={dropdowMenus.menu} submenus={dropdowMenus.submenus} link={dropdowMenus.link} showBM={showBM} />
                ))}
            </div>
        </div>
    )
}

export default HeaderBurgerMenus
