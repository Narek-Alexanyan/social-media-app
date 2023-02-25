import React, {useEffect} from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { HiOutlineChat } from "react-icons/hi";
import IconButton from "../../UI/buttons/IconButton";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    try {
      const result = await axios.patch(
        `http://localhost:3001/posts/${postId}/like`,
        {
          userId: loggedInUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setPost({ post: result.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper className="mt-8">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="mt-4 text-base dark:text-white">{description}</p>
      {picturePath && (
        <img
          src={`http://localhost:3001/assets/${picturePath}`}
          alt="post"
          className="w-full h-auto rounded-xl mt-3"
        />
      )}
      <div className="flex justify-between items-center mt-3">
        <div className="flex justify-between items-center gap-4">
          <div className="flex justify-between items-center gap-1">
            <button onClick={patchLike}>
              {isLiked ? (
                <AiFillHeart className="fill-red-600" />
              ) : (
                <AiOutlineHeart className="dark:text-white" />
              )}
            </button>
            <p className="text-base dark:text-white">{likeCount}</p>
          </div>

          <div className="flex justify-between items-center gap-1">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <HiOutlineChat className="dark:text-white" />
            </IconButton>
            <p className="text-base dark:text-white">{comments.length}</p>
          </div>
        </div>
        <IconButton>
          <AiOutlineShareAlt className="dark:text-white" />
        </IconButton>
      </div>
      {isComments && (
        <div className="mt-2">
          {comments.map((comment, i) => (
            <div key={`${name}-${i}`}>
              <span className="w-full h-[1px] bg-black dark:bg-slate-100 inline-block my-1"></span>
              <p className="my-1 pl-4 text-base text-black dark:text-white">
                {comment}
              </p>
            </div>
          ))}
          <span className="w-full h-[1px] bg-black dark:bg-slate-100 inline-block my-1"></span>
        </div>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
