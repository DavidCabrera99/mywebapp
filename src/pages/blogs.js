import React from 'react'
import styled from 'styled-components'
import {Paper, Card} from '@mui/material'
import logo from '../logo.svg'

const Blogs = ()=>{
    return(
        <StyledBlogsPage>
            <BlogTitle className="animate__animated animate__fadeInLeft">Blogs</BlogTitle>
            <BlogBody>
                <p>
                    La magia de utilizar los componentes react es que nuestras propiedades seguirán siendo las mismas
                    pero el resultado HTML en nuestro DOM será algo diferente. En el siguiente capítulo aprenderás
                    a trabajar con las propiedades de tus componentes React, ahora solo me queda recordarte que las
                    etiquetas HTML que podrás utilizar en tus componentes son:
                </p>
                <Card>
                    <img src={logo} alt="no"/>
                </Card>
                <p>
                Lo que me gustaría que entendieses tras leer este capitulo es que tienes que comenzar a diferenciar
                entre la definición de propiedades de tu componente y el resultado de su renderización en atributos
                HTML. Una vez tengas claro que tus componentes pueden tener todo tipo de propiedades con el
                nombre que decidas, excepto class, y que estas nunca se renderizarán a menos que establezcas sus
                valores en atributos HTML… podemos pasar al siguiente capítulo
                </p>
            </BlogBody>
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
    font-weight: 700;
    margin: 0;
    padding: 5px;
    position: sticky;
    top: 0;
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