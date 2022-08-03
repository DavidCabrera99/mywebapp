import {React ,useState, useEffect} from 'react'
import styled from 'styled-components'
import {Paper, Grid, Card, TextField,Button, IconButton, Badge, Skeleton} from '@mui/material'
import {useParams} from "react-router-dom"
import {FaTimes as ButtonUp} from 'react-icons/fa'
import {HelmetProvider,Helmet} from 'react-helmet-async'
import {APP_ID,API_KEY} from '../path'
import Backendless from 'backendless'

Backendless.initApp(APP_ID,API_KEY)

const Blogs = ()=>{
    let {id} = useParams();
    const [title,setTitle] = useState(0)
    const [body,setBody] = useState(1);
    const [img,setImg] = useState('')
    const [description,setDescription] = useState('')

    useEffect(()=>{
        Backendless.Data.of('blogs').findById(id).then((data)=>{
            console.log(data)
            setTitle(data.title)
            let body = data.body.replaceAll("{title}",data.title)
            //body = body.replaceAll("{ad}",ADS)
            setBody(body)
            setImg(data.image)
            setDescription(data.description)
        }).catch((error)=>{
            console.error(error)
        })
        // (async () => {
        //     const rawResponse = await fetch(PATH+'/api/blog/get/'+id)
        //     const content = await rawResponse.json()
        //     console.log(content)
        //     setTitle(content.title)
        //     let body = content.body.replaceAll("{title}",content.title)
        //     body = body.replaceAll("{ad}",ADS)
        //     setBody(body)
        //     setImg(PATH+"/img/"+content.img_link)
        //     setDescription(content.short_desc)
        //     //this.setState({title:content.title})
        // })()
    },[id]
    )
    return(
        <StyledBlogsPage>
            <HelmetProvider>
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
        </HelmetProvider>
            <Grid container sx={{padding: '10px'}}>
                <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                    <Grid item xs={12} md={8} sx={{margin:'auto'}}>
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
                <BlogBody  className="animate__animated animate__fadeInUp Blog-body" dangerouslySetInnerHTML={{__html:body}}>
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
        var query = Backendless.DataQueryBuilder.create();
        query.setWhereClause("blog_id = '"+id+"'")
        Backendless.Data.of('comments').find(query).then((data)=>{
            console.log(data)
            setComments(data)

        }).catch((error)=>{
            console.error(error)
        })
        // (async () => {
        //     const rawResponse = await fetch(PATH+'/api/blog/get/comments/' + id)
        //     const content = await rawResponse.json()
        //     console.log(content)
        //     setComments(content.comments)
        // })()
    },[id]
    )

    const addComment = (comment)=>{
        setComments(comments.concat(comment))
    }

    return(
        <div style={{color: 'white'}}>
            {comments.length===0?<h2>Se el primero en Comentar</h2>
            :
            <h2>Comentarios</h2>}
            {comments.map(comment=>{
                return(
                <SingleComment date= {comment.created} comment={comment.comment} key={comment.objectId} title={comment.email} like={comment.repeticiones} cid={comment.objectId}/>
                )
            })}
            <NewComment id={id} addComment={addComment}/>
        </div>
    )
}

const SingleComment = ({cid,comment,title,like,date})=>{

    const [repeat,SetRepeat] = useState(like)

    const RepeatComment= (event,comment)=>{
        event.preventDefault();
        Backendless.Data.of("comments").save({
            objectId: cid,
            repeticiones: like+1
        }).then((value)=>{
            SetRepeat(value.repeticiones)
            console.log(value)
        }).catch((error)=>{
            console.log(error)
        })
        // (async () => {
        //     const rawResponse = await fetch(PATH+'/api/comments/repeat/' + comment)
        //     const content = await rawResponse.json()
        //     console.log(content)
        //     SetRepeat(content.repeticiones)
        // })()
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
                <IconButton  sx={{color: 'orangered'
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
color: #ffffffa2;
`
const Title = styled.h2`
margin: 0px;
`

const NewComment = ({id, addComment})=>{

    
    const submit = (e)=>{
        e.preventDefault()
        let email = e.target.email.value
        let comment = e.target.comment.value;
        let id = e.target.id.value;

        Backendless.Data.of("comments").save({
            email: email,
            comment: comment,
            blog_id:id,
            repeticiones: 1
        }).then((value)=>{
            console.log(value)
            addComment(value)
        }).catch((error)=>{
            console.log(error)
        })
        // (async () => {
        //     const rawResponse = await fetch(PATH+'/api/add/comment',{
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             comment: comment,
        //             id: id,

        //         })
        //     })
        //     const content = await rawResponse.json()
        //     setComments(content.comments)
        // })()
    }

    return(
        <MyCard>
            <h2>Escribe un Comentario</h2>
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
    background-color: #ffffff30 !important;
    color: #fff !important;

`

const MyCard2 = styled.div`
    text-align: end;
`

const StyledBlogsPage = styled.div`
    min-height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

const BlogTitle =styled.h1`
    font-size: 3rem;
    color: white;
    text-shadow: orangered 1px 3px 20px;
    width: 100vw;
    max-width:750px;
    font-weight: 700;
    margin: 0;
    padding: 5px;
    user-select: none;
    background: linear-gradient(135deg, #66000065, #1112e765);;
    border-radius:15px;
    margin-top: 10px;
    
`;

const BlogBody = styled(Paper)`
    font-family: cursive;
    background-color: #ffffff30 !important;
    color: #fffe !important;
    padding 15px;
    text-align: left;
    max-width:  720px;
    font-weight: 500;
    font-size: 22px;
    margin-top: 10px;
`


export default Blogs;