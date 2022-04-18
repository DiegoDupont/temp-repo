import { Component } from 'react';

import './styles.css';
import { PostCard } from '../../components/PostCard';
import { loadPosts } from '../../utils/loadPosts';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue:''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos.slice(page,postsPerPage),
    allPosts: postsAndPhotos });
  }

  loadMorePosts = () =>{
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts)
    this.setState({posts, page: nextPage});
  }

  handleChange = (e) =>{
    const {value} = e.target;
    this.setState({searchValue: value})

  }

  render() {
    const { posts,page,postsPerPage,allPosts,searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;

    return (
      <>
      <Header/>
       <section className="container">
         <div className='search-container'>
            {!!searchValue &&  ( //basicamente um if chique
                <h1>Search Value: {searchValue}</h1>
            )}
            <Input type={'search'} onChange={this.handleChange} value={searchValue}/>
         </div>
          {filteredPosts.length > 0 && (
            <div className='posts'>
              {filteredPosts.map(post =>
              (
                <PostCard
                key={post.id} 
                title={post.title} 
                body={post.body}
                id={post.id}
                cover={post.cover}
                />
              )
              )}
            </div>
          )}

          {filteredPosts.length === 0 && (
            <p>Não existem posts</p>
          )}  
          
        <div className='button-container'>
          {!searchValue && ( <Button text = {'Load more posts'} onClick = {this.loadMorePosts} disabled = {noMorePosts}/>)}
        </div>
      </section>
      </>
    );
  }
}
