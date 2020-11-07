import './Home.scss';
import Navbar from '../navbar/Navbar';
import React, { Component } from 'react';

class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Navbar location="home"></Navbar>
                <p>Homepage</p>
            </div>
        )
    }
}

export default Home;