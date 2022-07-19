import {React,useState, useEffect} from 'react';
import styled from 'styled-components'
import {Grid} from '@mui/material'

export const AllBlogs  = ()=>{
    const [blogs, setBlogs] =useState([{pid:0, title:"HOla"}])
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

    return (
        /*<AllBlogsContainer>
            {blogs.map(blog =>{
                return (
                    <Blog ket={blog.key} title={blog.title}/>
                )
            })}
        </AllBlogsContainer>*/
        <Grid container spacing={2}>
            {
            blogs.map(blog =>{
                
                return (
                    <Blog key={blog.key} title={blog.title} id={blog.pid}/>
                )
            })}
        </Grid>
    )
}

const Blog = ({key,title,id}) =>{
    

    return (

        <Grid item xs={12} md={id%4===0?8:4}>
            <h1>{title}</h1>
            <p>{id} El primer parrafo de la noticia</p>
        </Grid>
    )
}

const AllBlogsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 2fr;

`
