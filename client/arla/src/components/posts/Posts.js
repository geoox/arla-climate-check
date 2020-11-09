import { Component } from "react";
import { Header, Icon, Search, Segment, Dropdown } from "semantic-ui-react";
import Navbar from "../navbar/Navbar";
import { Link } from 'react-router-dom';
import './Posts.scss';
import PostHighlight from "../post-highlight/PostHighlight";

export default class Posts extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        topics:[],
        tags:[],
        activeTopic:"",
        activeTags:[],
        posts:[],
    };


    componentDidMount() {
        this.setState({
            topics: ["Herd Levels", "Cows", "Heifers", "Crops", "Energy", "Fertilizers"],
            tags: ["milk production", "cows", "heifers", "food efficiency", "N efficiency", "floughage share", "% homegrown DM",
            "% homegrown", "Food requirements", "mortality rate", "food requirements"],
            posts:[{
                id: 1,
                date:"09.11.2020",
                rating:4.8,
                comments:2,
                tags:["milk", "cows"],
                username: "User1",
                title: "Milk productivity increased"
            }, 
            {
                id: 2,
                date:"09.11.2020",
                rating:4.8,
                comments:2,
                tags:["milk", "cows"],
                username: "User1",
                title: "Milk productivity increased"
            },
            {
                id: 3,
                date:"09.11.2020",
                rating:4.8,
                comments:2,
                tags:["milk", "cows"],
                username: "User1",
                title: "Milk productivity increased"
            },
            {
                id: 4,
                date:"09.11.2020",
                rating:4.8,
                comments:2,
                tags:["milk", "cows"],
                username: "User1",
                title: "Milk productivity increased"
            }],
        })
    }

    onClickTopic = event => {
        this.setState({
            activeTopic: event.target.innerText
        })
    }

    onClickTag = event => {
        if(!event.target.className.includes("tag-selected")){
            event.target.className+=" tag-selected";

            let active_tags = this.state.activeTags;
            active_tags.push(event.target.innerText);
            this.setState({
                activeTags: active_tags
            });
        } else {
            event.target.className="tag"
            let active_tags = this.state.activeTags;
            var index = active_tags.indexOf(event.target.innerText);
            if (index !== -1) {
                active_tags.splice(index, 1);
            }
            this.setState({
                activeTags: active_tags
            });
        }
        console.log(this.state);
    }

    onFilterClick = event => {
        console.log('filter clicked');
    }

    render() {
        const dropdownOptions = [
            { key: 1, text: 'Newest (date)', value: "date_desc" },
            { key: 2, text: 'Oldest (date)', value: "date_asc" },
            { key: 3, text: 'Most comments', value: "comments_desc" },
            { key: 4, text: 'Least comments', value: "comments_asc" },
            { key: 5, text: 'Best rating', value: "rating_desc" },
            { key: 6, text: 'Worst rating', value: "rating_asc" },
          ]
        return (
            <div className="posts-container">
                <Navbar location="forum"></Navbar>
                <div className="posts-content">
                    <Link to="/create-post">
                        <div className="create-post">
                            <Icon name="add circle"></Icon>Create post
                        </div>
                    </Link>
                    <Search
                    />
                    <br/>
                    <div className="filter-container">
                    <Segment raised className="filter-content">
                        <Header as="h1">Topic - Filter by selecting a topic</Header>
                        <div className="topics">
                            {this.state.topics.map(el =>
                                <div className={this.state.activeTopic.includes(el) ? "topic topic-selected" : "topic"} onClick={this.onClickTopic}>
                                    {el}
                                </div>
                            )}
                        </div>
                        <Header as="h1">Tags - Filter by one tag or more</Header>
                        <div className="tags">
                            {this.state.tags.map(el =>
                                <div className="tag" onClick={this.onClickTag}>
                                    {el}
                                </div>
                            )}
                        </div>
                        <br/>
                        <span>Sort by: </span><Dropdown clearable options={dropdownOptions} selection placeholder="Choose..." className="sort-dropdown"/>
                        <br/>
                        <div className="filter-btn" onClick={this.onFilterClick}>
                            <Icon name="filter"></Icon>Filter
                        </div>

                    </Segment>
                    </div>

                </div>
                <div className="posts-container">
                    <Segment raised className="posts-content">
                                
                                {this.state.posts.map(post => 
                                <div>
                                    <PostHighlight post={post}></PostHighlight>
                                    <br/><br/>
                                </div>   
                                )}
                    </Segment>
                </div>
            </div>
        )
    }
}