import React from 'react'
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import metaInfo  from '../metaHostName.json';

function LevelsDetails({ coverImage, image, courseImage, text, button, link }) {
    const GATracker  = () => {
        ReactGA.event({
            category: 'Image/Button to Redirect to New Page',
            action: `Redirected from "${window.location.pathname + window.location.search}" to "/coursesInfo/${link}"`,
            label: `${metaInfo.hostname}${window.location.pathname + window.location.search}`
        })
    }

    return (
        <div className={`levels__container ${coverImage && "courses__stylingLevel"}`}>
            <Link to={`/coursesInfo/${link}`} className="image" onClick={GATracker} aria-label={`${link}-link`}>
                <img className="image__poster" src={!coverImage ? image : courseImage} alt={`${link}-logo`} />
            </Link>
            <div className="textDetail">
                <p>{text}</p>
            </div>
            <Link to={`/coursesInfo/${link}`} className="button" onClick={GATracker}>
                <span>{button}</span>
            </Link>
        </div>
    )
}

export default LevelsDetails
