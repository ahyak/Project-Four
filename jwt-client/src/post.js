import React, {Component} from 'react'
import clientAuth from './clientAuth.js'

class Post extends Component {
  state = {

    posts: []
  }

  componentDidMount() {
    //make a call to retrieve posts...
    clientAuth.getPosts().then(res => {
      this.setState({
        posts: res.data
      })
    })
  }
  _addPost(evt) {
    evt.preventDefault()
    const newPost = {
      title: this.refs.title.value,
      image: this.refs.image.value,
      body: this.refs.body.value
    }
    clientAuth.addPost(newPost).then(res =>{
      this.setState({
        posts: [
          ...this.state.posts,
          res.data.post
        ]
      })
    })
  }
  _deletePost(id) {
    console.log(id)
    clientAuth.deletePost(id).then((res) => {
      console.log(res)
      this.setState({
        posts: this.state.posts.filter((post)=> {
          return post._id !== id
        })
      })
    })
  }
  toggleCompleted(id) {
    clientAuth.toggleCompleted(id).then((res) => {
      const todoIndex = this.state.todos.findIndex((todo) =>{
        return todo._id === id
      })
      this.setState({
        todos: [
          ...this.state.todos.slice(0, todoIndex),
          res.data.todo,
          ...this.state.todos.slice(todoIndex + 1)
        ]
      })
    })
  }
  render(){
    console.log(this.state.posts)
    const posts = this.state.posts.map((post, i) =>{
      return (
        <div className="row" key={i}>
          <div className="text-center col-md-4">
            <div className="col-md-12">
              <div className="panel panel-default list-box">
                <div className="panel-heading"><h1>{post.title}</h1></div>
                <div className="panel-body">
                  <img src={post.image} alt=" " className="img-responsive"/>
                  <p>{post.body}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
      )
    })
    return(
      <div className= 'Posts'>
        <h1> Posts </h1>
        <div>
          {posts}
        </div>
        <form onSubmit={this._addPost.bind(this)}>
          <input type='text' placeholder='Title' ref='title'/>
          <input type='text' placeholder='Body' ref='body'/>
          <input type='text' placeholder='Image' ref='image'/>
          <button type='submit'>Create New Post!</button>
        </form>
      </div>
    )
  }
}

export default Post
