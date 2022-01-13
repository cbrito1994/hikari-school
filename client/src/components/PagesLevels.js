import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function PagesLevels({ level, name, getId}) {
    // const [style, setStyle] = useState(false); className={`page__levels ${style && "active"}`}
    const { courseName } = useParams();
    
    useEffect(() => {
        const levels = document.querySelectorAll('.page__levels');
        levels.forEach((level) => level.classList.remove("active"));
        document.getElementById(`${courseName}1`)?.classList.add("active");
    }, [level, courseName])

    // useEffect(() => {
    //     if(level === "intro1" || level === "kodama1" || level === "nozomi1" || level === "sakura1" || level === "hikari1"){
    //         setStyle(true)
    //     }
    //     console.log(level, `${courseName}1`)
    // }, [level, courseName])

    const levels = document.querySelectorAll('.page__levels');
    levels.forEach((level) => {
        level.addEventListener("click", () => {
            levels.forEach((level) => level.classList.remove("active"));
            level.classList.add("active");
        }) 
    })

    return (
        <div id={level} className="page__levels" onClick={e => getId(e.target.id)}>
            {name}
        </div>
    )
}

export default PagesLevels
