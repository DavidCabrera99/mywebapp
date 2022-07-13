import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages'
import About from './pages/about';
import Blogs from './pages/blogs';
import Singup from './pages/singup';
import Contact from './pages/contact';

class App extends React.Component {
  constructor(){
    super();
    this.state  = {
      users:[
        {id: 1, name: "miguel", email: "test@miguelgomez.io"}, 
        {id: 2, name: "test", email: "test@test.es"}
      ],
      id:3
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

    </div>*/
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" exact element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/blogs" element={<Blogs />}/>
        <Route path="/sing-up"  element={<Singup />}/>
      </Routes>
    </Router>
  );
}
  handleOnAddUser (event) {
    event.preventDefault();
    let user = {
      name: event.target.name.value,
      email: event.target.email.value,
      id: this.state.id
    };
    
    this.setState({users: this.state.users.concat([user]),
                    id:this.state.id+1});
  }
}

class User extends React.Component{

  render(){
    return (
      <li>
        {this.props.id}: {this.props.name} - {this.props.email}
        
      </li>
    )
  }
}

class UserList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.users.map(u=>{
          return (
            <User
              key={u.id}
              id={u.id}
              name={u.name}
              email={u.email}
              />
          )
        })}
      </ul>
    )
  }
}

class UserForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onAddUser}>
        <input type="text" placeholder="Nombre" name="name" />
        <input type="email" placeholder="Email" name="email"/>
        <input type="submit" value="Guardar" />
      </form>
    );
  }
}

export default App;
