import React from 'react';
import {Paper, TextField, Button, Grid, ImageList, ImageListItem, ImageListItemBar, IconButton} from '@mui/material'
import { FaCopy } from 'react-icons/fa';
import Backendless from 'backendless';
import {APP_ID,API_KEY} from '../../../path'
import {BlogBody} from '../../blogs'

Backendless.initApp(APP_ID,API_KEY)

export class CreateBlogPage extends React.Component{
    constructor(){
        super()
        this.state = {
            selectedFile: [],
            temp_blog: '',
        }
    }

    onFileChange(event){
        this.setState({selectedFile: this.state.selectedFile.concat(event.target.files[0])})
        console.log(event.target.files[0])
    }

    onFileUpload(e){
        e.preventDefault()
        this.state.selectedFile.forEach((file)=>{
            Backendless.Files.upload(file,'img').then((fileUrl)=>{
                file.path = fileUrl.fileURL
                console.log(file)
                this.setState({selectedFile:this.state.selectedFile})
            }).catch((e)=>{

            })
            
            //const formData = new FormData();
            //formData.append("myFile",file,file.name);
            //(async () => {
            //   const rawResponse = await fetch(PATH+'/api/uploadfile',{
            //        method: 'POST',
            //        body: formData
            //    })
            //    const content = await rawResponse.json()
                // file.path = content.name
                // console.log(file)
                // this.setState({selectedFile:this.state.selectedFile})
            //})()
        })
        
    }

    changeBlog(e){
        this.setState({temp_blog: e.target.value})
    }

    copyClipboard(e,path){
        navigator.clipboard.writeText("<img width=\"100%\" src=\""+path+"\" alt=\"img\" />").then(()=>{
            console.log("ok")
            }).catch(err=>console.error(err))
    }
    
    render(){
    return (
        <Grid container spacing={2} padding="12px">
            <Grid item xs={0} md={2}>
                <span />
            </Grid>
            <Grid item xs={12} md={6}>
            <Paper sx={{
                padding: '15px',
                maxWidth: '750px'
            }}>
                <h1>Creacion de Blogs</h1>
                <form onSubmit={this.props.handleCreateBlog}>
                    <TextField fullWidth={true} color="warning" margin="normal" size="normal" label="Titulo" variant="outlined"  name="title" />
                    <TextField
                        multiline={true}
                        label="Cuerpo del Blog"
                        fullWidth={true}
                        minRows="10"
                        sx={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        name="body"
                        onChange={this.changeBlog.bind(this)}
                        />
                        <TextField
                        multiline={true}
                        label="Description"
                        fullWidth={true}
                        minRows="3"
                        sx={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        name="description"
                        />
                    <input type="hidden" name="image" value={this.state.selectedFile.length===0?"":this.state.selectedFile[0].path}/>
                    <Button type="submit" fullWidth={true} variant="contained">Guardar</Button>
                </form >
            </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper sx={{
                padding:'15px',
                maxWidth: '750px',
                marginTop: '10px',

            }} >
                <h2>Imagenes</h2>
                <p>La primera imagen es obligatoria y es la principal del blog</p>
                <ImageList sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
                    gridAutoColumns: "minmax(160px,1fr)"
                }}>
                {this.state.selectedFile.map(file =>{
                    console.log(file)
                    return(
                        <ImageListItem>
                        <img src={URL.createObjectURL(file)} alt="Imagenes"/>
                        <ImageListItemBar title={file.path===null?"":file.path} actionIcon={<IconButton onClick={(e)=>this.copyClipboard(e,file.path)} sx={{color: 'white'}}>
                            <FaCopy />
                            </IconButton>
                            }/>
                        </ImageListItem>
                    )
                })}
                </ImageList>
                <form onSubmit={this.onFileUpload.bind(this)}>
                    <input type="file" onChange={this.onFileChange.bind(this)}/>
                    {this.state.selectedFile.length===0?"":<Button type="submit" fullWidth={true} variant="contained">Guardar</Button>}
                </form>
            </Paper>
            </Grid>
            <Grid item xs={12} md={8} sx={{margin:'auto'}}>
                <BlogBody  className="Blog-body" dangerouslySetInnerHTML={{__html:this.state.temp_blog}}/>
            </Grid>
        </Grid>
    )
    }
}

