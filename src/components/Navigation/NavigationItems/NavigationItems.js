import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {/* if the user login, then show the order page other wise hide it or do not show to user */}
        {props.isAuthenticated ?<NavigationItem link="/orders">Your Orders</NavigationItem> : null }
        {props.isAuthenticated ?
        <NavigationItem link="/logout">Log Out</NavigationItem> :
        <NavigationItem link="/user-authentication">Log In</NavigationItem>
        }
    </ul>
);

export default navigationItems;