import PostHeader from "./postHeader.jsx";
import PostBody from "./postBody.jsx";
import PostAction from "./postAction.jsx";
import PostComments from "./postComments.jsx";


const PostCard = ({ post }) => {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostAction
        postId={post}
        commentCount={post?.comments?.length}
      />
      <PostComments post={post} />
    </article>
  );
};

export default PostCard;
