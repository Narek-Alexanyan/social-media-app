import React from "react";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { getFriends } from "../../state/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.auth.user.friends);

  useEffect(() => {
    dispatch(getFriends(userId));
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
