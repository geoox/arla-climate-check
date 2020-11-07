import './PostHighlight.scss';
import Navbar from '../navbar/Navbar';
import React, { Component } from 'react';
import { Segment, Icon, Container, Button, Statistic, Header, Grid } from 'semantic-ui-react';

export default class PostHighlight extends Component {

    constructor(props) {
        super(props);
        console.log('props', props);
    }

    render() {
        return (
                <Container className="post-highlight">
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <div>
                                    <Icon name="user circle outline" size='big'></Icon>
                                    <span>Username</span>
                                    <p><b>Milk is the best</b></p>
                                    {/* <p>Topic: Milk</p> */}
                                    <div className="tags">
                                    {this.props.tags.map(el => 
                                        <div className="tag">
                                            {el}
                                        </div>)}
                                    </div>
                                    
                                </div>
                            </Grid.Column>
                            <Grid.Column className="post-stats">
                                <Statistic.Group size="mini">
                                    <Statistic>
                                        <Statistic.Value><Icon name="comments"></Icon>{this.props.comments}</Statistic.Value>
                                        <Statistic.Label>Comments</Statistic.Label>
                                    </Statistic>
                                    <Statistic>
                                        <Statistic.Value><Icon name="star"></Icon>{this.props.rating}</Statistic.Value>
                                        <Statistic.Label>Rating</Statistic.Label>
                                    </Statistic>
                                    <Statistic>
                                        <Statistic.Value><Icon name="calendar alternate"></Icon>{this.props.date}</Statistic.Value>
                                        <Statistic.Label>Date</Statistic.Label>
                                    </Statistic>
                                </Statistic.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Container>
        )
    }

}
