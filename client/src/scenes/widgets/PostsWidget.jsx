import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const result = await axios.get("http://localhost:3001/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setPosts({ posts: result.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedPosts = result.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      dispatch(setPosts({ posts: sortedPosts }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
