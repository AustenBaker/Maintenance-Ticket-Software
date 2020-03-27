import React from 'react';
import { ScreenContainer } from 'react-native';
import './Menu.css';

export const Menu = () => {
    <ScreenContainer className="Menu" title="Navigation">
        <Button className="MenuButton" title="New Ticket" onPress={() => alert("todo!")} />
        <Button className="MenuButton" title="Profile" onPress={() => alert("todo!")} />
        <Button className="MenuButton" title="Login" onPress={() => alert("todo!")} />
    </ScreenContainer>
};

export default Menu;
