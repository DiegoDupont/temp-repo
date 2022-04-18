
import axios from 'axios'
export const loadPosts = async () =>{
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');

    const photosResponse = await axios.get('https://jsonplaceholder.typicode.com/photos');

    const photosAndposts = postsResponse.data.map((post,index) => {
      return {...post, cover: photosResponse.data[index].url}
    });

    return photosAndposts;
};