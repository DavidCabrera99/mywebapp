import {React,useState, useEffect} from 'react';
import {Grid,Card, CardMedia, CardContent, CardActionArea, Skeleton} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import {APP_ID,API_KEY} from '../../path'
import Backendless from 'backendless'

Backendless.initApp(APP_ID,API_KEY)

export const AllBlogs  = ()=>{
    const [blogs, setBlogs] =useState(null)
    useEffect(()=>{
        Backendless.Data.of('blogs').find().then((result)=>{
            setBlogs(result)
        }).catch((error)=>{
            console.error(error)
        })
        // (async () => {
        //     const rawResponse = await fetch(PATH+'/api/get/blogs')
        //     const content = await rawResponse.json()
        //     console.log(content)
        //     setBlogs(content.blogs)
        //     //this.setState({title:content.title})
        // })()
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
        <Helmet>
            <title>Blogs - MyReactDbBlog</title>
            <meta
            name="description"
            content="Todo tipo de blogs en un solo sitio web para todo tipo de personas"
            />
            <meta property="og:image" content="./logo512.png"/>
            <meta property="og:title" content="Blogs - MyReactDbBlog"/>
            <meta property="og:description" content="Todo tipo de blogs en un solo sitio web para todo tipo de personas"/>
            <meta property="og:type" content="website" />
        </Helmet>
        <Grid container spacing={2} padding="12px">
            {blogs===null?
            [0,1,2,3,4,5,6,7,9,8].map(blog =>{
                a+=1
                return (
                    <Blog key={a} skeleton={true} id={a}/>
                )
            })
            
            :
            blogs.map(blog =>{
                a+=1
                return (
                    <Blog key={blog.objectId} title={blog.title} id={a} image={blog.image} pid={blog.objectId} description={blog.description} skeleton={false}/>
                )
            })}
            
        </Grid>
        </div>
    )
}

const Blog = ({image,title,id,description,pid,skeleton}) =>{
    let navigate = useNavigate();

    const routeChange = (event,id)=>{
        let path = `/blogs/${id}`
        navigate(path)
    }

    return (
            <Grid item xs={12} md={4}>
                {skeleton?
                <Skeleton variant="rectangular" sx={{
                    borderRadius:'4px',
                }}>
                    <Card variant="outlined" sx={{
                    height:'300px',
                    
                    width:'100vw',
                    }}></Card>
                </Skeleton>
                :
                <Card variant="outlined" sx={{
                    backgroundColor:'#FFFFFF30',
                    height:'300px',
                    color:'white',
                    boxShadow:'black 1px 3px 20px'
                    }}>
                    <CardActionArea onClick={(e)=>routeChange(e,pid)} sx={{height:'100%',alignItems:'flex-start',flexDirection:'column'}}>
                    <CardMedia component="img" alt="Image" src={image} title={""+image} height="200px"/>
                    <CardContent sx={{
                        padding:'2px',
                        width: '100%'
                    }}>

                <Title>{title}</Title>
                <hr/>
                <SubTitle>{description}</SubTitle>
                </CardContent>
                </CardActionArea>
                </Card>
                }
            </Grid>
    )
}

const Title = styled.h1`
    margin-block-start: 0;
    margin-block-end: 0;
`
const SubTitle = styled.p`
    font-family: cursive;
    margin-block-start: 0;
    margin-block-end: 0;
    text-align: left;
`