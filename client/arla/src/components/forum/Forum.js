import './Forum.scss';
import Navbar from '../navbar/Navbar';
import TopicCard from '../topic-card/TopicCard';
import PostHighlight from '../post-highlight/PostHighlight';
import React, { Component } from 'react';
import { Segment, Header, Grid, Icon, Button, Container, Statistic } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class Forum extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        newest_posts:[{
            id: 1,
            username:"",
            title:"",
            date:"",
            rating:"",
            comments:"",
            tags:[]
        }],
        top_posts:[{
            id: 1,
            username:"",
            title:"",
            date:"",
            rating:"",
            comments:"",
            tags:[]
        }],
        post:{
            id: 1,
            username:"",
            title:"",
            date:"",
            rating:"",
            comments:"",
            tags:[]
        }
    }

    componentDidMount(){

        this.fetchNewestPosts();
        this.fetchTopPosts();
        //fetch data from database
        this.setState({
            post:{
                id: 1,
                username:"User1",
                title:"Milk is the best",
                date:"07.11.2020",
                rating:"4.9",
                comments:"12",
                tags:["milk", "production", "status"]
            }
        })
    }

    async fetchNewestPosts(){
        const posts = (await (await fetch('http://localhost:5000/posts-newest')).json()).response;
        this.setState({
            newest_posts: posts
        });
    }

    async fetchTopPosts(){
        const posts = (await (await fetch('http://localhost:5000/posts-newest')).json()).response;
        this.setState({
            top_posts: posts
        });
    }

    render() {
        return (
            <div className="forum-container">
                <Navbar location="forum"></Navbar>
                <Link to="/create-post">
                    <div className="create-post">
                        <Icon name="add circle"></Icon>Create post
                    </div>
                </Link>
                <div className="topics">
                    <Segment raised>
                        <Header as='h1'>Choose a Topic</Header>
                        <Header as='h4'></Header>
                        <br></br>
                        <Grid>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <TopicCard posts="22" top="4.7" img="https://react.semantic-ui.com/images/wireframe/paragraph.png" text="Herd Levels"></TopicCard>
                                </Grid.Column>
                                <Grid.Column>
                                    <TopicCard posts="22" top="4.7" img="https://react.semantic-ui.com/images/wireframe/paragraph.png" text="Cows"></TopicCard>
                                </Grid.Column>
                                <Grid.Column>
                                    <TopicCard posts="22" top="4.7" img="https://react.semantic-ui.com/images/wireframe/paragraph.png" text="Heifers"></TopicCard>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <TopicCard posts="22" top="4.7" img="https://react.semantic-ui.com/images/wireframe/paragraph.png" text="Crops"></TopicCard>
                                </Grid.Column>
                                <Grid.Column>
                                    <TopicCard posts="22" top="4.7" img="https://react.semantic-ui.com/images/wireframe/paragraph.png" text="Energy"></TopicCard>
                                </Grid.Column>
                                <Grid.Column>
                                    <TopicCard posts="22" top="4.7" img="https://react.semantic-ui.com/images/wireframe/paragraph.png" text="Fertilizer"></TopicCard>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </div>
                <div className="posts">
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Segment raised>
                                    <Header as='h2'>Newest Posts</Header>
                                    <br/>
                                    {
                                        this.state.newest_posts.map(post => <PostHighlight post={post}></PostHighlight>)
                                    }
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment raised>
                                <Header as='h2'>Top Posts</Header>
                                    <br/>
                                    {
                                        this.state.top_posts.map(post => <PostHighlight post={post}></PostHighlight>)
                                    }
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        )
    }

}

export default Forum;