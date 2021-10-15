import axiosWithAuth from './axiosWithAuth'

const articleService = ()=> {
    articles = [];
axiosWithAuth().get('http://localhost:5000/api/articles')
.then(resp=>{
    this.setState({
        articles: [resp.data]
    });

})
.catch(err=>{
    console.log(err);
})
}
export default articleService;

//Task List:
//1. Complete articleServices. This module should make an authenticated call and return an array of those articles.