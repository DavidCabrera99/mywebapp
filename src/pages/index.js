import React from 'react'
import {Grid} from "@mui/material"
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import brain from '../svg/brain.svg'
import chart from '../svg/chart-increasing.svg'
import face from '../svg/face-with-open-mouth.svg'
/*const Home = ()=>{
    return(
        <div>
            <h1>Home Page</h1>
        </div>
    )
}*/

class Home extends React.Component {
    render() {
    return (
      <div className="App">
        <Helmet>
            <title>MyReactDbBlog</title>
            <meta
            name="description"
            content="Todo tipo de blogs en un solo sitio web para todo tipo de personas"
            />
            <meta property="og:image" content="./logo512.png"/>
            <meta property="og:title" content="ReactDbBlog"/>
            <meta property="og:description" content="Todo tipo de blogs en un solo sitio web para todo tipo de personas"/>
            <meta property="og:type" content="website" />
        </Helmet>
        
        <div>
          <Grid container sx={{
              alignItems:"baseline",
            }}>
            
            <Grid item xs={6} md={4} >
              <img src={brain} alt="brain" width="100%" height="100%" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Mh2>
                  We developed this website for the people who want to know and experiment all kinds of information.
                </Mh2>
              </Grid>              
              <Grid item xs={12} md={6}>
                <Mh1>
                  The team want to work hard and to be able to improve this website to make it accessible and easy to use for everyone.
                  </Mh1>
              </Grid>
              <Grid item xs={0} md={4}>
              <img src={face} alt="brain" width="100%" height="100%"/>
              </Grid>
              <Grid item xs={6} md={4}>
              <img src={chart} alt="brain" width="100%" height="100%"/>
              </Grid>
              <Grid item xs={12} md={6}>
                  <Mh2>
                  This web is free to use and always would be, so the ads is the only way to keep this site alive we hope the ads dont be to much trouble.
                  </Mh2>
              </Grid> 
          </Grid>
        </div>
      </div>
      
    );
  }
} 

const Mh2 = styled.h1`
color: white;
margin-left: -15vw;
@media screen and (max-width: 768px){
  margin-left: 0;
}
z-index:  21;
`

const Mh1 = styled.h1`
color: white;
margin-right: -15vw;
@media screen and (max-width: 768px){
  margin-left: 0;
}
z-index:  21;
`
export default Home;