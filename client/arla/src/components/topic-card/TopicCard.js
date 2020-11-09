import './TopicCard.scss';
import Navbar from '../navbar/Navbar';
import React, { Component } from 'react';
import { Segment, Icon, Grid, Image, Statistic } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class TopicCard extends Component {

    constructor(props) {
        super(props);
        console.log('props', props);
    }

    render() {
        return (
            <div className="topic-card">
                <Link to="/posts">
                <Image src={this.props.img} />
                <Segment compact>{this.props.text}</Segment>
                <Statistic.Group size="mini">
                    <Statistic>
                        <Statistic.Value><Icon name="file alternate"></Icon>{this.props.posts}</Statistic.Value>
                        <Statistic.Label>Posts</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value><Icon name="star"></Icon>{this.props.top}</Statistic.Value>
                        <Statistic.Label>Top Rated</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                </Link>
            </div>
        )
    }

}
