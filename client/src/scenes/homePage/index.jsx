import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import useMediaQuery from "../../hooks/useMediaQuery";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const { _id, picturePath } = useSelector((state) => state.auth.user);

  return (
    <div
      className={`w-full h-full p-4 justify-between ${
        isMobileScreen ? "block" : "flex"
      }`}
    >
      <div className={`${isMobileScreen ? "" : "w-[26%]"}`}>
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div
        className={`${isMobileScreen ? "mt-8" : ""} ${
          isMobileScreen ? "" : "w-[42%]"
        }`}
      >
        <MyPostWidget picturePath={picturePath} />
        <PostsWidget userId={_id} />
      </div>
      {!isMobileScreen && (
        <div className="w-[26%]">
          <AdvertWidget />
          <div className="my-8"></div>
          <FriendListWidget userId={_id} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
