import React from 'react';
import './App.css';
import 'animate.css';
import Navbar from './components/Navbar'
import {BrowserRouter as Router,Routes,Route,useNavigate} from 'react-router-dom'
import Home from './pages'
import About from './pages/about';
import Blogs from './pages/blogs';
import Singup from './pages/singup';
import Calculator from './pages/calculator';
import Menu from './components/Menu';
import Login from './components/Login';
import {CreateBlogPage} from './pages/blog/create_blog';
import {AllBlogs} from './pages/blog/all_blogs';
import Simon from './pages/simon'
import {APP_ID,API_KEY} from './path'
import Backendless from 'backendless'

Backendless.initApp(APP_ID,API_KEY)

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
        <Route path="/simon/" element={<Simon />}/>
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
    let description = e.target.description.value;
    let image = e.target.image.value;
    console.log(image);
    Backendless.Data.of('blogs').save({
      title: title,
      body: body,
      description: description,
      image: image
      
    }).then((saved) => {
        let navigate = useNavigate();
        let path = `/blogs/${saved.objectId}`
        navigate(path)
      console.log(saved);
    }).catch((err) => {
      console.log(err);
    })

    // (async () => {
    //     const rawResponse = await fetch(PATH+'/api/add/blog',{
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             title: title,
    //             body: body,
    //             description: description,
    //             image: image,

    //         })
    //     })
    //     const content = await rawResponse.json()
    //     console.log(content)
    // })()
  }
}



export default App;
