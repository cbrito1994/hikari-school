import React from 'react'
import { Link } from 'react-router-dom'


function BurgerMenus({ menu, link, showBM }) {
    return (
        <Link to={`/coursesInfo/${link}`} className="bm__dropdownInfo" onClick={showBM}>
            <div className="bm__dropdownNames">{menu}</div>
        </Link>
    )
}

export default BurgerMenus
