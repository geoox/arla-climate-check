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
        currentSort:''
    };

    timer = null;


    componentDidMount() {
        this.fetchTags();
        this.fetchTopics();
        this.fetchAllPosts();
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

    async fetchTopics(){
        const topics = (await (await fetch('http://localhost:5000/topics')).json()).response;
        this.setState({
            topics: topics
        })
        console.log(topics);

    }

    async fetchTags(){
        const tags = (await (await fetch('http://localhost:5000/tags')).json()).response;
        this.setState({
            tags: tags
        })
        console.log(tags);
    }

    async fetchFilteredPosts(){
        let filterObj = {};
        filterObj.topic = this.state.activeTopic.length>0 ? this.state.activeTopic : null;
        filterObj.tags = this.state.activeTags.length>0 ? this.state.activeTags : null;
        filterObj.sort = this.state.currentSort.length>0 ? this.state.currentSort : null;
        let url = 'http://localhost:5000/filtered_posts?';
        if(this.state.activeTags){
            this.state.activeTags.forEach(tag => {
                url = url + 'tag=' + tag + '&';
            })
        }
        url = url + 'topic=' + this.state.activeTopic;
        if(this.state.currentSort.length>0) url = url + '&sort=' + this.state.currentSort;
        console.log(url);
        const posts = (await (await fetch(url)).json()).response;
        console.log('filtered', filterObj);
        console.log(posts);
        this.setState({
            posts: posts
        });
    }

    async fetchAllPosts(){
        const posts = (await (await fetch('http://localhost:5000/posts')).json()).response;
        console.log('allposts', posts);
        this.setState({
            posts: posts
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

    onSortChosen = (e, { value }) => {
        this.setState({ currentSort: value }, () => console.log(this.state))
    }

    onFilterClick = event => {
        console.log('filter clicked');
        this.fetchFilteredPosts();
    }

    onSearch = async event => {
        clearTimeout(this.timer);
        this.timer = setTimeout( async () => {
            const posts = (await (await fetch('http://localhost:5000/filtered_posts?title='+event.target.value)).json()).response;
            this.setState({
                posts: posts
            })
        }, 1500);

    }

    render() {
        const dropdownOptions = [
            { key: 1, text: 'Date - Descending', value: 'created_at DESC' },
            { key: 2, text: 'Date - Ascending', value: 'created_at ASC' },
            // { key: 3, text: 'Comments - Descending', value: "comments_desc" },
            // { key: 4, text: 'Comments - Ascending', value: "comments_asc" },
            { key: 3, text: 'Rating - Descending', value: 'rating DESC' },
            { key: 4, text: 'Rating - Ascending', value: 'rating ASC' },
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
                    <Search onKeyUp={this.onSearch}
                    />
                    <br/>
                    <div className="filter-container">
                    <Segment raised className="filter-content">
                        <Header as="h1">Topic - Filter by selecting a topic</Header>
                        <div className="topics">
                            {this.state.topics.map(el =>
                                <div className={this.state.activeTopic.includes(el.name) ? "topic topic-selected" : "topic"} onClick={this.onClickTopic}>
                                    {el.name}
                                </div>
                            )}
                        </div>
                        <Header as="h1">Tags - Filter by one tag or more</Header>
                        <div className="tags">
                            {this.state.tags.map(el =>
                                <div className="tag" onClick={this.onClickTag}>
                                    {el.name}
                                </div>
                            )}
                        </div>
                        <br/>
                        <span>Sort by: </span><Dropdown clearable options={dropdownOptions} value={this.state.currentSort} selection placeholder="Choose..." className="sort-dropdown" onChange={this.onSortChosen}/>
                        <br/>
                        <div className="filter-btn" onClick={this.onFilterClick}>
                            <Icon name="filter"></Icon>Filter
                        </div>

                    </Segment>
                    </div>

                </div>
                <div className="posts-container">
                    <Segment raised className="posts-content">
                                
                                {this.state.posts? this.state.posts.map(post => 
                                <div>
                                    <PostHighlight post={post}></PostHighlight>
                                    <br/><br/>
                                </div>   
                                )
                                : <div></div>}
                    </Segment>
                </div>
            </div>
        )
    }
}