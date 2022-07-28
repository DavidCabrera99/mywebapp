import React from 'react'
import {Helmet} from 'react-helmet'

const description = "Information about the project and the company who create the page."

const About = ()=>{
    return(
        <div style={{color: 'white'}}>
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
            <p>
                {description}
            </p>
        </div>
    )
}

export default About;