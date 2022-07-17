import React from 'react';
import {Paper, TextField, TextareaAutosize} from '@mui/material'

export const CreateBlogPage = ()=>{
    return (
        <div>
        <Paper sx="padding:15px;max-width:750px;">
            <h1>Creacion de Blogs</h1>
            <TextField fullWidth="true" color="warning" margin="normal" size="normal" label="Titulo" variant="outlined"  name="title" sx=""/>
            <TextField
                multiline="true"
                label="Cuerpo del Blog"
                fullWidth="true"
                minRows="10"
                sx="
                    margin-top:10px;"
                />
        
        </Paper>
        </div>
    )
}

