import React from 'react';
import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent
} from 'carbon-components-react/es/components/UIShell';
import UserAvatar20 from '@carbon/icons-react/lib/user--avatar/20';
import {Link} from 'react-router-dom';

const MainHeader = () => {
    return <div>
        <Header aria-label = "Carbon Header">
            <SkipToContent/>
            <HeaderName
                element = {Link}
                to = "/"
                prefix = "IBM"
            >
                Carbon App Demo
            </HeaderName>
            <HeaderNavigation aria-label = "Carbon Nav">
                <HeaderMenuItem 
                    element = {Link}
                    to = "/viewData"
                >
                    View Data
                </HeaderMenuItem>
                <HeaderMenuItem 
                    element = {Link}
                    to = "/addData"
                >
                    Add Data
                </HeaderMenuItem>
            </HeaderNavigation>
            <HeaderGlobalBar>
                <HeaderGlobalAction aria-label = "User">
                    <UserAvatar20/>
                </HeaderGlobalAction>
            </HeaderGlobalBar>
        </Header>
    </div>
}

export default MainHeader;