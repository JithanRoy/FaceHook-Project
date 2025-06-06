import React from "react";
import PostCard from "./postCard.jsx";
const PostList = ({ posts }) => {
  return (
    !!posts && posts.map((post) => <PostCard key={post.id} post={post} />)
  );
};

export default PostList;
