import React, { useEffect, useState } from 'react';
import { getUsers, getPostsByUserId } from '../services/api';

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await getUsers();



      const users = userRes.data.users;
      let allPosts = [];



      for (const [userId, userName] of Object.entries(users)) {
        const postRes = await getPostsByUserId(userId);
        const posts = postRes.data.posts.map(p => ({ ...p, author: userName }));
        allPosts = [...allPosts, ...posts];
      }




      const sortedPosts = allPosts.sort((a, b) => b.id - a.id); // assuming higher ID means newer
      setFeed(sortedPosts);
    };






    fetchData();
  }, []);



  return (
    <div>
      <h2>Feed</h2>
      {feed.map(post => (
        <div key={post.id}>
          <p><strong>{post.author}</strong>: {post.content}</p>
        </div>
      ))}
    </div>
  );
};



export default Feed;
