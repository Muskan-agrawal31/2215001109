import React, { useEffect, useState } from 'react';
import { getUsers, getPostsByUserId, getCommentsByPostId } from '../services/api';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await getUsers();
      const users = userRes.data.users;
      let postComments = [];

      for (const [userId] of Object.entries(users)) {
        const postRes = await getPostsByUserId(userId);
        const posts = postRes.data.posts;

        for (const post of posts) {
          const commentsRes = await getCommentsByPostId(post.id);
          postComments.push({ ...post, commentCount: commentsRes.data.comments.length });
        }
      }




      const maxComments = Math.max(...postComments.map(p => p.commentCount));
      const trending = postComments.filter(p => p.commentCount === maxComments);
      setTrendingPosts(trending);
    };

    fetchData();
  }, []);



  return (
    <div>
      <h2>Trending Posts</h2>
      {trendingPosts.map(post => (
        <div key={post.id}>
          <p><strong>Post:</strong> {post.content}</p>
          <p><strong>Comments:</strong> {post.commentCount}</p>
        </div>
      ))}
    </div>


  );
};




export default TrendingPosts;
