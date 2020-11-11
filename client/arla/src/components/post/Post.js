import { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Rating, Grid, Icon, Comment, Form, TextArea } from "semantic-ui-react";
import Navbar from "../navbar/Navbar";
import './Post.scss';

export default class Post extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        title: "",
        tags: [],
        topic: "",
        text: "",
        rating: 0,
        newRating: 0,
        comments: [],
        image: {}
    }

    componentDidMount() {
        this.setState({
            title: "This is how I have increased productivity of milk harvest this week!",
            tags: ["productivity", "cows", "weekly"],
            topic: "Cows",
            comments:[
                {
                    user:"User1",
                    date:"09.11.2020",
                    text: "Neat!"
                },
                {
                    user:"User2",
                    date:"09.11.2020",
                    text: "I want to know more!"
                },
                {
                    user:"User3",
                    date:"09.11.2020",
                    text: "I am not agreeing to your means..."
                },
            ],
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae nibh vitae diam auctor tristique at a metus. Donec porttitor ligula ut consectetur fermentum. Mauris luctus non nibh pellentesque molestie. Vivamus aliquam a ante in egestas.Donec lobortis erat velit, ut tristique velit facilisis vel. Duis at suscipit lorem, eu finibus nunc. Vivamus vehicula rhoncus tempor. Donec in purus eget ex eleifend vehicula vitae sed arcu. Quisque eget venenatis neque.Mauris volutpat quis tellus et bibendum. Aliquam non lectus nec turpis blandit vulputate. Pellentesque porta sapien massa, et luctus erat consectetur eu. Vestibulum in accumsan mauris. In fermentum consequat tempor. Maecenas in ultrices lacus. Curabitur mollis a orci id suscipit. Fusce dolor enim, porttitor et luctus ac, rutrum ac ante. Nunc id dui vel ligula imperdiet consequat. Vestibulum sed semper urna, eget imperdiet diam. Phasellus sed lacus ac urna pellentesque faucibus eleifend at massa. Maecenas vulputate augue a neque lobortis convallis. In gravida rutrum suscipit. Etiam vitae diam accumsan, ornare lacus quis, vehicula nibh. Cras dapibus lacus magna, id viverra tellus sodales eu.",
            rating: 4.7
        })
    }

    onRatingChange = (event, { rating, maxRating }) => {
        console.log(event.target.value)
        this.setState({ newRating: rating })
        console.log(this.state);
    }

    render() {
        return (
            <div className="post-container">
                <Navbar location="forum"></Navbar>
                <div className="post-content">
                    <Segment raised>
                        <Header as="h1">{this.state.title}</Header>
                        <Link to="/posts">
                        <span>Topic:</span> <div className="topic">
                            {this.state.topic}
                        </div>
                        </Link>
                        <div className="tags"><span>Tags:</span>
                            {this.state.tags.map(el =>
                            <Link to="/posts">
                                <div className="tag">
                                    {el}
                                </div>
                            </Link>)}
                        </div>
                        <div>Rating: {this.state.rating}</div>
                        <Rating maxRating={5} rating={this.state.rating} size="huge" disabled />
                        <Container fluid textAlign='justified'>
                            {this.state.text}
                        </Container>
                    </Segment>
                </div>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Segment raised className="compare-content">
                                <Header as="h2">Compare your farm with the author's farm</Header>
                                <Icon name="users" size="big"></Icon>
                                <span>Author username</span>
                                <div className="button-custom">Compare Now!</div>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment raised className="rating-content">
                                <Header as="h2">Rate this post - how useful was it for you?</Header>
                                <Rating maxRating={5} rating={this.state.newRating} icon='star' size='massive' clearable onRate={this.onRatingChange}/>
                                <div className="button-custom">Submit</div>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div className="comment-thread">
                <Segment raised>
                    <Header as="h1">Leave a comment</Header>
                    <Form className="add-comment">
                        <TextArea placeholder="Share your thoughts..." />
                        <div className="button-custom comment-btn">Add Comment</div>
                        <div className="user-info">
                            <Icon name="users" size="big"></Icon>
                            <span>User</span>
                        </div>

                    </Form>
                            <Comment.Group>

                            {this.state.comments.map(comment=>
                                <Comment>
                                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'></Comment.Avatar>
                                    <Comment.Content>
                                        <Comment.Author as='a'>{comment.user}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{comment.date}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{comment.text}</Comment.Text>
                                        <Comment.Actions>
                                            <Comment.Action>Reply</Comment.Action>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>)}
                            </Comment.Group>
                </Segment>
                </div>
            </div>
        )
    }
}