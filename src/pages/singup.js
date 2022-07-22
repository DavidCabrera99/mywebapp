import React from 'react'
import {Helmet} from 'react-helmet'
const Singup = ()=>{
    return(
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
            <h1>Singup Page</h1>
        </div>
    )
}

export default Singup;