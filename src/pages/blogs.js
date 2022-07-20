import {React ,useState, useEffect} from 'react'
import styled from 'styled-components'
import {Paper, Grid} from '@mui/material'
import {NavLink as Link, useParams} from "react-router-dom"

const Blogs = ()=>{
    let {id} = useParams();
    const [title,setTitle] = useState(0)
    const [body,setBody] = useState(1);

    useEffect(()=>{
        (async () => {
            const rawResponse = await fetch('/api/blog/get/'+id)
            const content = await rawResponse.json()
            console.log(content)
            setTitle(content.title)
            let body = content.body.replaceAll("{title}",content.title)
            setBody(body)
            //this.setState({title:content.title})
        })()
    },[id]
    )
    return(
        <StyledBlogsPage>
            <Grid container>
            <Grid item xs={0} md={2}>
                <span />
            </Grid>
                <Grid item xs={12} md={8}>
            <BlogTitle className="animate__animated animate__fadeInLeft">{title}</BlogTitle>
            <BlogBody  dangerouslySetInnerHTML={{__html:body}}>
                
            </BlogBody>
            <Link to="/blogs/create">Create a New Blog</Link>
            </Grid>
            </Grid>
        </StyledBlogsPage>
    )
}
const StyledBlogsPage = styled.div`
    min-height: 100vh;
    width: 100vw;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

const BlogTitle =styled.h1`
    font-size: clamp(3rem,5vw,7vw);
    color:#eee;
    width: 100%;
    max-width:750px;
    font-weight: 700;
    margin: 0;
    padding: 5px;
    user-select: none;
    background-color: #282c34;
    border-radius:15px;
`;

const BlogBody = styled(Paper)`
    padding 15px;
    text-align: left;
    max-width:  720px;
    font-weight: 500;
    font-size: 22px;
`


export default Blogs;