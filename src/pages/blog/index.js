import React from 'react';

export const Blog = ({blog})=>{
    return (
        <div>
            <h1>Esto es el blog</h1>
            <div style="text-align: left;">
                {blog}
            </div>
        </div>
    )
}