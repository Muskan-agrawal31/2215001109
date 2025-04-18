import React, { useEffect, useState } from 'react';
import { getUsers, getPostsByUserId, getCommentsByPostId } from '../services/api';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await getUsers();
      const userList = userRes.data.users;
      const commentCounts = [];



      for (const [userId, name] of Object.entries(userList)) {
        const postRes = await getPostsByUserId(userId);
        const posts = postRes.data.posts;
        let totalComments = 0;



        for (const post of posts) {
          const commentsRes = await getCommentsByPostId(post.id);
          totalComments += commentsRes.data.comments.length;
        }

        commentCounts.push({ name, totalComments });
      }

      const sorted = commentCounts.sort((a, b) => b.totalComments - a.totalComments);
      setTopUsers(sorted.slice(0, 5));
    };

    fetchData();





  }, []);

  return (
    <div>
      <h2>Top Users</h2>
      <ul>
        {topUsers.map((user, i) => (
          <li key={i}>{user.name} - {user.totalComments} comments</li>
        ))}
      </ul>
    </div>
  );
};




export default TopUsers;
