import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/authSlice";
import UserImage from "./UserImage";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import IconButton from "../UI/buttons/IconButton";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    try {
      const result = await axios.patch(
        `http://localhost:3001/users/${_id}/${friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setFriends({ friends: result.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between items-center">
        <UserImage image={userPicturePath} size="55px" />
        <div
          className="ml-4"
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <h5 className="font-medium dark:text-white">{name}</h5>
          <p className="text-sm dark:text-slate-100">{subtitle}</p>
        </div>
      </div>
      <IconButton onClick={() => patchFriend()}>
        {isFriend ? (
          <AiOutlineUserDelete className="dark:text-white" />
        ) : (
          <AiOutlineUserAdd className="dark:text-white" />
        )}
      </IconButton>
    </div>
  );
};

export default Friend;
