import React from 'react';
import {
    InfoSection,
    InfoCard
} from '../../Global/Info/Info';
import Carbon32 from '@carbon/icons-react/lib/carbon/32';
import DataBase32 from '@carbon/icons-react/lib/data--base/32';
import Develop32 from '@carbon/icons-react/lib/development/32';

const LandingPage = () => {
    return <div className = "bx--grid bx--grid--full-width landing-page">
        <div className = "bx--row landing-page__banner">
            <div className = "bx--col-lg-16">
                <h1 className = "landing-page__heading">
                    React JS + Carbon Design System &amp; IBM DB2 Example App
                </h1>
                <h4>
                    Example FullStack App composed by
                </h4>
                <h4>
                    <strong>FrontEnd using: </strong>React JS
                </h4>
                <h4>
                    <strong>BackEnd using: </strong>Express JS
                </h4>
            </div>
        </div>
        <InfoSection heading = "Technologies" className = "landing-page__r3">
            <InfoCard
                heading = "IBM Carbon Design System"
                body = "Design Language for React, Angular, Vue and Vanilla JS"
                icon = {<Carbon32/>}
            />
            <InfoCard
                heading = "IBM DB2"
                body = "The relational database of IBM, BD2 stores data on IBM Cloud"
                icon = {<DataBase32/>}
            />
            <InfoCard
                heading = "Facebook React JS"
                body = "A framework from Facebook for develop front end using JS Motor"
                icon = {<Develop32/>}
            />
        </InfoSection>
    </div>
}

export default LandingPage;