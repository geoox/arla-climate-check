import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import './CreatePost.scss';
import { Segment, Icon, Input, Form, TextArea, Header, Grid } from 'semantic-ui-react';


export default class CreatePost extends Component{

    constructor(props){
        super(props);
    }

    state={
        title:"",
        topics:[],
        tags:[],
        activeTopic:"",
        activeTags:[],
        selectedFile:{},
        text:""
    };

    componentDidMount(){
        this.setState({
            topics: ["Herd Levels", "Cows", "Heifers", "Crops", "Energy", "Fertilizers"],
            tags: ["milk production", "cows", "heifers", "food efficiency", "N efficiency", "floughage share", "% homegrown DM",
            "% homegrown", "Food requirements", "mortality rate", "food requirements"]
        })
    }

    onTitleChange = event =>{
        this.setState({
            title: event.target.value
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

    onTextChange = event => {
        this.setState({
            text: event.target.value
        })
    }

    onUploadPicture = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    onSubmitPost = event => {
        console.log(this.state);
    }

    render(){
        return(
            <div className="create-post-container">
                <Navbar location="forum"></Navbar>
                <div className="create-post-content">
                
                <Icon name="user circle outline" size='big'></Icon>
                <span>Username</span>
                <Header as="h1">Title</Header>
                <Input placeholder='Write your title here' onChange={this.onTitleChange} />
                <Header as="h1">Topic - choose one topic</Header>
                <div className="topics">
                    {this.state.topics.map(el => 
                        <div className={this.state.activeTopic.includes(el)?"topic topic-selected":"topic"} onClick={this.onClickTopic}>
                            {el}
                        </div>
                    )}
                </div>
                <Header as="h1">Tags - one tag or more</Header>
                <div className="tags">
                    {this.state.tags.map(el => 
                        <div className="tag" onClick={this.onClickTag}>
                            {el}
                        </div>
                    )}
                </div>
                <Header as="h1">Text in your post</Header>
                <Form>
                    <TextArea placeholder="Write your text here" onChange={this.onTextChange} />
                </Form>
                <Header as="h1">Upload a picture to your post</Header>
                <input type="file" accept="image/*" id="actual-btn" hidden onChange={this.onUploadPicture}/>
                <label htmlFor="actual-btn" className="add-picture"><Icon name="add circle"></Icon>Upload</label>
                <span>{this.state.selectedFile.name? "Selected file: "+this.state.selectedFile.name: "No selected file"}</span>
                
                
                <div className="submit-btn" onClick={this.onSubmitPost}>
                    Submit post
                </div>

            </div>
            </div>
        )
    }

}