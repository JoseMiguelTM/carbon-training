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

const MainHeader = () => {
    return <div>
        <Header aria-label = "Carbon Header">
            <SkipToContent/>
            <HeaderName href = "/" prefix = "IBM">
                Carbon App Demo
            </HeaderName>
            <HeaderNavigation aria-label = "Carbon Nav">
                <HeaderMenuItem href = "/viewData">View Data</HeaderMenuItem>
                <HeaderMenuItem href = "/addData">Add Data</HeaderMenuItem>
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