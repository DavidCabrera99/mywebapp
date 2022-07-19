import React from 'react';
import {Paper, TextField, Button, Grid} from '@mui/material'
import styled from 'styled-components'
import { render } from '@testing-library/react';

export class CreateBlogPage extends React.Component{
    constructor(){
        super()
        this.state = {
            selectedFile: null
        }
    }

    onFileChange(event){
        this.setState({selectedFile: event.target.files[0]})
        console.log(event.target.files[0])
    }

    onFileUpload(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append("myFile",this.state.selectedFile,this.state.selectedFile.name);
        console.log(this.state.selectedFile.name);
        (async () => {
            const rawResponse = await fetch('/api/uploadfile',{
                method: 'POST',
                body: formData
            })
            const content = await rawResponse.json()
            console.log(content)
        })()
    }

    render(){
    return (
        <BasePage>
            <span />
            <Paper sx="padding:15px;max-width:750px;
                
            ">
                <Grid container>
                <h1>Creacion de Blogs</h1>
                <form onSubmit={this.props.handleCreateBlog}>
                    <TextField fullWidth={true} color="warning" margin="normal" size="normal" label="Titulo" variant="outlined"  name="title" sx=""/>
                    <TextField
                        multiline={true}
                        label="Cuerpo del Blog"
                        fullWidth={true}
                        minRows="10"
                        sx="
                            margin-top:10px;
                            margin-bottom:10px;
                            "
                        name="body"
                        />
                    <Button type="submit" fullWidth={true} variant="contained">Guardar</Button>
                </form >
                </Grid>
            </Paper>
            <Paper sx="padding:15px;max-width:750px;margin-top:10px;
                
            ">
                <form onSubmit={this.onFileUpload.bind(this)}>
                    <input type="file" onChange={this.onFileChange.bind(this)}/>
                    <Button type="submit" fullWidth={true} variant="contained">Guardar</Button>
                </form>
            </Paper>
            <span />
        </BasePage>
    )
    }
}

const BasePage = styled.div`
    display: grid;
    grid-template-columns: 0.3fr auto 0.3fr;
    padding:15px;

`
