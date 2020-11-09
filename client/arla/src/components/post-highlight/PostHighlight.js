import './PostHighlight.scss';
import React, { Component } from 'react';
import { Segment, Icon, Container, Button, Statistic, Header, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class PostHighlight extends Component {

    constructor(props) {
        super(props);
        console.log('props', props.post);
    }

    render() {
        return (
            // <Link to={
            //     `/post/${this.props.post.id}`
            // }>
                <Container className="post-highlight">
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <div>
                                    <Icon name="user circle outline" size='big'></Icon>
                                    <span>{this.props.post.username}</span>
                                    <Link to={`/post/${this.props.post.id}`}><p><b>{this.props.post.title}</b></p></Link>
                                    {/* <p>Topic: Milk</p> */}
                                    <div className="tags-highlight">
                                    {this.props.post.tags.map(el => 
                                    <Link to="/posts">
                                        <div className="tag-highlight">
                                            {el}
                                        </div>
                                        </Link>)}
                                    </div>
                                    
                                </div>
                            </Grid.Column>
                            <Grid.Column className="post-stats">
                                <Statistic.Group size="mini">
                                    <Statistic>
                                        <Statistic.Value><Icon name="comments"></Icon>{this.props.post.comments}</Statistic.Value>
                                        <Statistic.Label>Comments</Statistic.Label>
                                    </Statistic>
                                    <Statistic>
                                        <Statistic.Value><Icon name="star"></Icon>{this.props.post.rating}</Statistic.Value>
                                        <Statistic.Label>Rating</Statistic.Label>
                                    </Statistic>
                                    <Statistic>
                                        <Statistic.Value><Icon name="calendar alternate"></Icon>{this.props.post.date}</Statistic.Value>
                                        <Statistic.Label>Date</Statistic.Label>
                                    </Statistic>
                                </Statistic.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Container>
                // </Link>
        )
    }

}
