import React from 'react';
import { getContributorMenu } from '../../layout/menus/FMMQMenus';
import CommonsMenuPageWrapper from '../commons/CommonsMenuPageWrapper';

function ContributorPageMenuWrapper(props) {
    const { children } = props;
    const contributorMenu = getContributorMenu();
    return <CommonsMenuPageWrapper menuArray={contributorMenu}>{children}</CommonsMenuPageWrapper>;
}

ContributorPageMenuWrapper.propTypes = {};

ContributorPageMenuWrapper.defaultProps = {};

export default ContributorPageMenuWrapper;
