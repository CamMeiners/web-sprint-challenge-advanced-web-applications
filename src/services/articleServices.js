import axiosWithAuth from '../utils/axiosWithAuth'

const articleService = (state, setState)=> {
axiosWithAuth().get('http://localhost:5000/api/articles')
.then(resp=>{
    console.log('bruh', resp.data)
    setState(
     resp.data
    );

})
.catch(err=>{
    console.log(err);
})
}
export default articleService;

//Task List:
//1. Complete articleServices. This module should make an authenticated call and return an array of those articles.