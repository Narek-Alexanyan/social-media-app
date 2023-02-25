import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "../widgets/UserWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import PostsWidget from "../widgets/PostsWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import useMediaQuery from "../../hooks/useMediaQuery";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  const getUser = async () => {
    try {
      const result = await axios.get(`http://localhost:3001/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return <div>OOPS!</div>;

  return (
    <div>
      <div
        className={`w-full p-6 gap-8 justify-center ${
          isMobileScreen ? "block" : "flex"
        }`}
      >
        <div className={`${isMobileScreen ? "" : "w-[26%]"}`}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <div className="my-8"></div>
          <FriendListWidget userId={userId} />
        </div>
        <div
          className={`${isMobileScreen ? "" : "w-[42%]"} ${
            isMobileScreen ? "mt-8" : ""
          }`}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <div className="my-8"></div>
          <PostsWidget userId={userId} isProfile={true} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
