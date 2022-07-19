import React from 'react';
import './App.css';
import 'animate.css';
import Navbar from './components/Navbar'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages'
import About from './pages/about';
import Blogs from './pages/blogs';
import Singup from './pages/singup';
import Calculator from './pages/calculator';
import Menu from './components/Menu';
import Login from './components/Login';
import {CreateBlogPage} from './pages/blog/create_blog';
import {AllBlogs} from './pages/blog/all_blogs';

class App extends React.Component {
  constructor(){
    super();
    this.state  = {
      navToggled: false,
      token:null
    }
  }
  render() {

  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="App-welcome">Bienvenido a React</h2>
      </header>
        <UserForm onAddUser={this.handleOnAddUser.bind(this)} />
        <p className="App-intro">
          Lista de Usuarios
        </p>

        <UserList users={this.state.users}/>

        <Toggle handleNavToggle={this.handleNavToggle.bind(this)}/>
        </div>*/
        <div className="App">
          

    <Router>
      <Navbar handleNavToggle={this.handleNavToggle.bind(this)}/>
      {this.state.navToggled ? <Menu handleNavToggle={this.handleNavToggle.bind(this)}/> : null}
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/calculator" element={<Calculator />}/>
        <Route path="/blogs/:id" element={<Blogs />}/>
        <Route path="/blogs/" element={<AllBlogs />}/>
        <Route path="/sing-up"  element={this.state.token?<Singup />:<Login />}/>
        <Route path="/blogs/create" element={<CreateBlogPage handleCreateBlog={this.handleCreateBlog.bind(this)}/>}/>
      </Routes>
      {/*<aside className="aside-container">
        <h3>
          Title
        </h3>
        <ul>
          <li>uno</li>
          <li>dos</li>
          <li>tres</li>
        </ul>
      </aside>*/}
    </Router>
    </div>
  );

}

  handleNavToggle (event) {
    this.setState({navToggled: !this.state.navToggled});
    
  }

  handleCreateBlog (e) {
    e.preventDefault()
    let title = e.target.title.value
    let body = e.target.body.value;

    (async () => {
        const rawResponse = await fetch('/api/add/blog',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body
            })
        })
        const content = await rawResponse.json()
        console.log(content)
    })()
  }
}



export default App;
