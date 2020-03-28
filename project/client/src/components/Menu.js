import React from 'react';
import ReactNative from 'react-native';
import './Menu.css';

// create our navigation menu
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            buttons: []
        };
        props.pages.map(page => (
            this.setState({buttons: [...this.state.buttons, new Button({
                className:"MenuButton",
                accessibilityRole: "menuItem",
                title: page,
                onPress: () => alert('todo!')
            })]})
        ));
    };

    render() {
        var buttonList = this.state.buttons.map(button => (button.render()));
        return (
            <ReactNative.ScreenContainer className='Menu' accessibilityRole='menu' id={this.state.id}>
                {buttonList}
            </ReactNative.ScreenContainer>
        );
    }
};

export default Menu;
