import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import articleService from '../services/articleServices';
import axiosWithAuth from '../utils/axiosWithAuth';
import Article from './Article';
import EditForm from './EditForm';

const View = (props) => {
    const [articles, setArticles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState();
    const { push } = useHistory();

    useEffect(() => {
        articleService(articles, setArticles)
    },[])
    
    
    const handleDelete = (id) => {
        
		axiosWithAuth().delete(`http://localhost:5000/api/articles/${id}`)
		.then(resp=>{
            push(`/view`)
            console.log("resp bruh", resp.data)
            setArticles(articles.filter(article=>{
                return article.id !== id;
            }))
		})
        .catch(err => {
            console.log(err);
        })

    }

    const handleEdit = (article) => {
        axiosWithAuth().put(`http://localhost:5000/api/articles/${article.id}`, article)
        .then(resp=> {
            push(`/view`)
            console.log(';asdlfkja;lsdkfj;alsdfj;laskdfj;laskdjf', resp)
            setArticles(resp.data);
        
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleEditSelect = (id)=> {
        setEditing(true);
        setEditId(id);
    }

    const handleEditCancel = ()=>{
        setEditing(false);
    }

    return(<ComponentContainer>
        <HeaderContainer>View Articles</HeaderContainer>
        <ContentContainer flexDirection="row">
            <ArticleContainer>
                {
                    articles.map(article => {
                        return <ArticleDivider key={article.id}>
                            <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/>
                        </ArticleDivider>
                    })
                }
            </ArticleContainer>
            
            {
                editing && <EditForm editId={editId} handleEdit={handleEdit} handleEditCancel={handleEditCancel}/>
            }
        </ContentContainer>
    </ComponentContainer>);
}

export default View;

//Task List:
//1. Build and import axiosWithAuth module in the utils.
//2. When the component mounts, make an http request that adds all articles to state.
//3. Complete handleDelete method. It should make a request that delete the article with the included id.
//4. Complete handleEdit method. It should make a request that updates the article that matches the included article param.


const Container = styled.div`
    padding: 0.5em;
`
const HeaderContainer = styled.h1`
    border-bottom: solid black 2px;
    padding: 1em;
    margin:0;
    font-size: 1.5em;
    background: black;
    color: white;
`

const ArticleDivider = styled.div`
    border-bottom: 1px solid black;
    padding: 1em;
`

const ComponentContainer = styled.div`
    display:flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
`

const ArticleContainer = styled.div`
    background: grey;
`;