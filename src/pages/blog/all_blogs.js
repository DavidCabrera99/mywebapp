import {React,useState, useEffect} from 'react';
import styled from 'styled-components'
import {Grid,Card, CardMedia, CardContent, CardActionArea} from '@mui/material'
import {useNavigate} from 'react-router-dom'

export const AllBlogs  = ()=>{
    const [blogs, setBlogs] =useState(null)
    useEffect(()=>{
        (async () => {
            const rawResponse = await fetch('/api/get/blogs')
            const content = await rawResponse.json()
            console.log(content)
            setBlogs(content.blogs)
            console.log(blogs)
            //this.setState({title:content.title})
        })()
    }
    ,[])
    var a=-1;
    return (
        /*<AllBlogsContainer>
            {blogs.map(blog =>{
                return (
                    <Blog ket={blog.key} title={blog.title}/>
                )
            })}
        </AllBlogsContainer>*/
        <div>
        <Grid container spacing={2} padding="12px">
            {blogs===null?a:
            blogs.map(blog =>{
                a+=1
                return (
                    <Blog key={blog.key} title={blog.title} id={a} image={"http://localhost:3002/img/"+blog.img_link} pid={blog.pid} description={blog.short_desc}/>
                )
            })}
            
        </Grid>
        </div>
    )
}

const Blog = ({image,title,id,description,pid}) =>{
    let navigate = useNavigate();

    const routeChange = (event,id)=>{
        let path = `/blogs/${id}`
        navigate(path)
    }

    return (
            <Grid item xs={12} md={id%4===1||id%4===2?8:4}>
                <Card variant="outlined">
                    <CardActionArea onClick={(e)=>routeChange(e,pid)}>
                    <CardMedia component="img" alt="Image" src={image} title={""+image} height="200"/>
                    <CardContent>

                <h1>{title}</h1>
                <p>{description}</p>
                </CardContent>
                </CardActionArea>
                </Card>
            </Grid>
    )
}

const AllBlogsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 2fr;

`
