import {React ,useState, useEffect} from 'react'
import styled from 'styled-components'
import {Paper, Grid, Card, TextField,Button, IconButton, Badge, Skeleton} from '@mui/material'
import {NavLink as Link, useParams} from "react-router-dom"
import {FaTimes as ButtonUp} from 'react-icons/fa'
import {PATH,ADS} from '../path'

const Blogs = ()=>{
    let {id} = useParams();
    const [title,setTitle] = useState(0)
    const [body,setBody] = useState(1);

    useEffect(()=>{
        (async () => {
            const rawResponse = await fetch(PATH+'/api/blog/get/'+id)
            const content = await rawResponse.json()
            console.log(content)
            setTitle(content.title)
            let body = content.body.replaceAll("{title}",content.title)
            body = body.replaceAll("{ad}",ADS)
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
                {title===0?
                    <Skeleton variant="rectangular" sx={{
                        width: '100vw',
                        maxWidth:'750px',
                        borderRadius:'15px',
                    }}>
                        <BlogTitle>hola</BlogTitle>
                        </Skeleton>:
                    <BlogTitle className="animate__animated animate__fadeInLeft">{title}</BlogTitle>
                }
                {title===0?
                    <Skeleton variant="rectangular" sx={{
                        width: '100vw',
                        maxWidth:'750px',
                        borderRadius:'4px',
                    }} height="320px">
                        <BlogBody>hola</BlogBody>
                        </Skeleton>:
                <BlogBody  dangerouslySetInnerHTML={{__html:body}}>
                </BlogBody>
                }
                <Link to="/blogs/create">Create a New Blog</Link>
                </Grid>
                <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Comments id={id}/>
                </Grid>
            </Grid>
        </StyledBlogsPage>
    )
}

const Comments = ({id})=> {
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        (async () => {
            const rawResponse = await fetch(PATH+'/api/blog/get/comments/' + id)
            const content = await rawResponse.json()
            console.log(content)
            setComments(content.comments)
        })()
    },[id]
    )
    return(
        <div>
            {comments.map(comment=>{
                return(
                <SingleComment comment={comment.comment} key={comment.cid} title={comment.author}/>
                )
            })}
            <NewComment id={id} setComments={setComments}/>
        </div>
    )
}

const SingleComment = ({comment,title})=>{
    return(
        
            <MyCard>
                <h3>{title}:</h3>
                <Badge badgeContent={'x4'} color="warning" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                    <p>{comment}</p>
                </Badge>
                <MyCard2>
                <IconButton sx={{
                    }}>
                    <ButtonUp />
                    2
                </IconButton>
                </MyCard2>
            </MyCard>
        
    )
}

const NewComment = ({id, setComments})=>{

    const submit = (e)=>{
        e.preventDefault()
        let email = e.target.email.value
        let comment = e.target.comment.value;
        let id = e.target.id.value;

        (async () => {
            const rawResponse = await fetch(PATH+'/api/add/comment',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    comment: comment,
                    id: id,

                })
            })
            const content = await rawResponse.json()
            setComments(content.comments)
        })()
    }

    return(
        <MyCard>
            <form onSubmit={submit}>
            <TextField fullWidth={true} color="warning" margin="normal" size="normal" label="Email" variant="outlined"  name="email"/>
            <TextField
                multiline={true}
                label="Commentario"
                fullWidth={true}
                minRows="3"
                sx={{
                    marginTop:'10px',
                    marginBottom:'10px'
                }}
                    
                    
                name="comment"
            />
            <input type="hidden" name="id"  value={id}/>
            <Button type="submit" fullWidth={true} variant="contained">Comentar</Button>
            </form>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    margin-top:10px;
    padding: 15px;
    max-width: 720px;
    text-align: left;
`

const MyCard2 = styled.div`
    text-align: end;
`

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
    font-size: 3rem;
    color:#eee;
    width: 100vw;
    max-width:750px;
    font-weight: 700;
    margin: 0;
    padding: 5px;
    user-select: none;
    background-color: #282c34;
    border-radius:15px;
    margin-top: 10px;
`;

const BlogBody = styled(Paper)`
    padding 15px;
    text-align: left;
    width: 100vw;
    max-width:  720px;
    font-weight: 500;
    font-size: 22px;
    margin-top: 10px;
`


export default Blogs;