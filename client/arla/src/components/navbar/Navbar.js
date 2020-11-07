import React, { Component } from 'react';
import { Menu, Segment, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Arla_Foods_logo.svg'
import './Navbar.scss';

class Navbar extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.setState({ activeItem: this.props.location});
    }

    state = {};
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    };

    render() {
        const { activeItem } = this.state
        return (
            <Segment className="navbar">
                <Menu stackable secondary >
                    <Image src={logo} size='mini' className="arla-logo"/>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        color='black'
                        as={NavLink} exact to="/home"
                    >
                        Home
                    </Menu.Item>

                    <Menu.Item
                        name='myfarm'
                        active={activeItem === 'myfarm'}
                        onClick={this.handleItemClick}
                        disabled
                    >
                        My Farm
                    </Menu.Item>

                    <Menu.Item
                        name='mycases'
                        active={activeItem === 'mycases'}
                        onClick={this.handleItemClick}
                        disabled
                    >
                        My Cases
                    </Menu.Item>
                    <Menu.Item
                        name='menu'
                        active={activeItem === 'menu'}
                        onClick={this.handleItemClick}
                        disabled
                    >
                        Menu
                    </Menu.Item>
                    <Menu.Item
                        name='forum'
                        active={activeItem === 'forum'}
                        onClick={this.handleItemClick}
                        as={NavLink} exact to="/forum"
                    >
                        Forum
                    </Menu.Item>
                    <Menu.Item
                        name='arlagarden'
                        active={activeItem === 'arlagarden'}
                        onClick={this.handleItemClick}
                        disabled
                    >
                        Arlagarden
                    </Menu.Item>
                </Menu>
            </Segment>
        )
    }
}

export default Navbar;