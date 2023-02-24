import React from "react";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setFriends } from "../../state";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const FriendListWidget = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/users/${userId}/friends`,
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

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div>
      <WidgetWrapper>
        <h5 className="mb-6 font-medium text-black dark:text-white">
          Friend List
        </h5>
        <div className="flex flex-col gap-6">
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        </div>
      </WidgetWrapper>
    </div>
  );
};

export default FriendListWidget;
