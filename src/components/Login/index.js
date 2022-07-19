import React from 'react'
import styled from 'styled-components'
import {TextField, Button, Card} from '@mui/material'

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username:'',
            age:0,
            email:''
        }
    }

    addUser(e){
        e.preventDefault()
        let username = e.target.name.value
        let email = e.target.email.value
        let age = parseInt(e.target.age.value);
        console.log(JSON.stringify({
            username: username,
            email: email,
            age: age
        }));
        (async () => {
            const rawResponse = await fetch('/api/add/user',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    age: age
                })
            })
            const content = await rawResponse.json()
            console.log(content)
        })()

        /*const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.
        }   */     

        this.setState({username:username,email:email,age:age})
    }

    render() {
    return(
        <StyledLoginPage>
            <Heading>{this.state.username}-{this.state.email}-{this.state.age}</Heading>
            <form onSubmit={this.addUser.bind(this)}>
                <Card   variant="outlined" sx="width:70vw; padding:15px;">
                    <TextField fullWidth={true} color="warning" margin="normal" size="small" label="Nombre" variant="outlined"  name="name" sx="display:block;"/>
                    <TextField fullWidth={true} color="warning" margin="normal" size="small" label="Email" variant="outlined"  name="email" sx="display:block;"/>
                    <TextField fullWidth={true} color="warning" margin="normal" size="small" label="Age" variant="outlined"  name="age" sx="display:block;"/>
                    <Button type="submit" color="warning" variant="contained" name="submit">Login</Button>
                </Card>
            </form> 

         </StyledLoginPage>
    )
    }
}

const StyledLoginPage = styled.div`
    min-height: 100vh;
    width: 100vw;
    background-color: #282c34;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;
const Heading =styled.h1`
    font-size: clamp(3rem,5vw,7vw);
    color:#eee;
    font-weight: 700;
    margin: 0;
    padding: 0;

    user-select: none;
`;