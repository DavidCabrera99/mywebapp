import React from 'react'
import {Helmet} from 'react-helmet'
import {Grid} from '@mui/material'
import {Link} from "react-router-dom"

const description = "Information about the project and the company who create the page."

const About = ()=>{
    return(
        <div style={{color: 'white',filter: 'drop-shadow(0px 3px 2px black)'}}>
            <Helmet>
            <title>About - MyReactDbBlog</title>
            <meta
            name="description"
            content={description}
            />
            <meta property="og:image" content="./logo512.png"/>
            <meta property="og:title" content="About - MyReactDbBlog"/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website" />
        </Helmet>
            <h1>About Page</h1>
            <Grid container>
                <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                    <Grid item xs={12} md={8}><p>
                This page born from the idea of be a simple blog page for React Tutorials writen at the same time of this page was developed. So, i realized that i'm not good enough to
                write tutorials for React, becouse i'm two weeks only with this "not framework", and that was the reason why i think in convert this page to a general blog page focused on
                Memes and tips about Programming.
            </p></Grid>
            <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                    <Grid item xs={12} md={8}><p>
                In the content of this page is still accessible all the small components and pages that i had for the tutorials, in this page we want to put the links to thats pages only for
                fun, there are some of them that are not fully developed so that can conduct to some errors.
            </p></Grid>
            <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                    <Grid item xs={12} md={8}><p>
                The team of developers and contributors of this page, by the moment, it's just me. I am open to suggestions and any people who want to contribute to this page, making his own blogs 
                or helpeing to the development of this page.
            </p></Grid>
            <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                    <Grid item xs={12} md={8}><p>
                How you can noted, i'm not an english speaker, so i have to translate this page from Spanish to English by my self and my level is low. I couldn't keep the page in my language becouse
                of the ads provider dont let me :(. If anybody see a bad translation, please contact me for make the page more "professional looking".
            </p></Grid>
            <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                <Grid item xs={0} md={2}>
                    <span />
                </Grid>
                    <Grid item xs={12} md={8}>
                    <Link to="/simon">Simon</Link>    
                    <Link to="/calculator">Calculator</Link>  
                    <Link to="/sing-up">SingUp</Link>   
                    </Grid>
            <Grid item xs={0} md={2}>
                    <span />
                </Grid>
        </Grid>

        </div>
    )
}

export default About;