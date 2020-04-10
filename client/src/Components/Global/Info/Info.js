import React from 'react';

const InfoSection = props => {
    return <div className = {`bx--row ${props.className} info-section`}>
        <div className = "bx--col-md-8 bx--col-lg-4 bx--col-xlg-3">
            <h3 className = "info-section__heading">{props.heading}</h3>
        </div>
        {props.children}
    </div>
}

const InfoCard = ({heading, body, icon}) => {
    return <div className = "info-card bx--col-md-4 bx--col-lg-4 bx--col-xlg-3 bx--offset-xlg-1">
        <h4 className = "info-card__heading">
            {heading}
        </h4>
        <p className = "info-card__body">
            {body}
        </p>
        {icon}
    </div>
}

export {InfoSection, InfoCard}