import {React ,useState, useEffect} from 'react'
import styled from 'styled-components'
import {Paper, Grid, Card, TextField,Button, IconButton, Badge, Skeleton} from '@mui/material'
import {NavLink as Link, useParams} from "react-router-dom"
import {FaTimes as ButtonUp} from 'react-icons/fa'
import {PATH,ADS} from '../path'
import {Helmet} from 'react-helmet'

const Blogs = ()=>{
    let {id} = useParams();
    const [title,setTitle] = useState(0)
    const [body,setBody] = useState(1);
    const [img,setImg] = useState('')
    const [description,setDescription] = useState('')

    useEffect(()=>{
        (async () => {
            const rawResponse = await fetch(PATH+'/api/blog/get/'+id)
            const content = await rawResponse.json()
            console.log(content)
            setTitle(content.title)
            let body = content.body.replaceAll("{title}",content.title)
            body = body.replaceAll("{ad}",ADS)
            setBody(body)
            setImg(PATH+"/img/"+content.img_link)
            setDescription(content.short_desc)
            //this.setState({title:content.title})
        })()
    },[id]
    )
    return(
        <StyledBlogsPage>
            <Helmet>
            <title>{title}</title>
            <meta
            name="description"
            content={description}
            />
            <meta property="og:image" content={img}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website" />
        </Helmet>
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
                <BlogBody  className="animate__animated animate__fadeInUp" dangerouslySetInnerHTML={{__html:body}}>
                </BlogBody>
                }
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
                <SingleComment date= {comment.date_created} comment={comment.comment} key={comment.cid} title={comment.author} like={comment.repeticiones} cid={comment.cid}/>
                )
            })}
            <NewComment id={id} setComments={setComments}/>
        </div>
    )
}

const SingleComment = ({cid,comment,title,like,date})=>{

    const [repeat,SetRepeat] = useState(like)

    const RepeatComment= (event,comment)=>{
        event.preventDefault();
        (async () => {
            const rawResponse = await fetch(PATH+'/api/comments/repeat/' + comment)
            const content = await rawResponse.json()
            console.log(content)
            SetRepeat(content.repeticiones)
        })()
    }

    return(
        
        <MyCard>
                <Date>{date}</Date>
                <Title>{title}:</Title>
                <Badge badgeContent={'x'+repeat} color="warning" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                    <p>{comment}</p>
                </Badge>
                <MyCard2>
                {repeat===like?<IconButton  onClick={(e)=>RepeatComment(e,cid)}>
                    <ButtonUp />
                    2
                </IconButton>:
                <IconButton  sx={{color: '#081da9'
                    }}>
                    <ButtonUp />
                    2
                </IconButton>}
                </MyCard2>
            </MyCard>
        
    )
}

const Date = styled.p`
margin: 0px;
color: #000000a2;
`
const Title = styled.h2`
margin: 0px;
`

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