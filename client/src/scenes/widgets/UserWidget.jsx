import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import {
  HiBriefcase,
  HiLocationMarker,
  HiOutlineUser,
  HiPencil,
} from "react-icons/hi";
import { AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai";
import IconButton from "../../UI/buttons/IconButton";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    try {
      const result = await axios.get(`http://localhost:3001/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <div>OOPS!</div>;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <div
        className="pb-4 flex justify-between items-center"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <div className="flex justify-between items-center">
          <UserImage image={picturePath} />
          <div className="ml-6">
            <h4 className="text-black dark:text-white font-medium cursor-pointer dark:hover:text-slate-200 hover:text-slate-600 transition-colors">
              {firstName} {lastName}
            </h4>
            <p className="text-base text-black dark:text-slate-200">
              {friends.length} friends
            </p>
          </div>
        </div>
        <IconButton className="ml-6">
          <HiOutlineUser className="dark:text-white" />
        </IconButton>
      </div>

      <span className="w-full h-[1px] bg-black dark:bg-slate-100 inline-block"></span>

      <div className="py-4">
        <div className="flex items-center mb-2">
          <HiLocationMarker className="dark:text-white" />
          <p className="text-base text-black dark:text-slate-200 ml-6">
            {location}
          </p>
        </div>
        <div className="flex items-center">
          <HiBriefcase className="dark:text-white" />
          <p className="text-base text-black dark:text-slate-200 ml-6">
            {occupation}
          </p>
        </div>
      </div>

      <span className="w-full h-[1px] bg-black dark:bg-slate-100 inline-block"></span>

      <div className="py-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-base text-black dark:text-slate-200">
            Who's viewed your profile
          </p>
          <p className="text-base font-medium text-black dark:text-slate-200">
            {viewedProfile}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base text-black dark:text-slate-200">
            Impressions of your post
          </p>
          <p className="text-base text-black font-medium dark:text-slate-200">
            {impressions}
          </p>
        </div>
      </div>

      <span className="w-full h-[1px] bg-black dark:bg-slate-100 inline-block"></span>

      <div className="py-4">
        <p className="text-base text-black dark:text-white font-medium mb-4">
          Social Profiles
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-between items-center">
            <AiOutlineTwitter className="dark:text-white" />
            <div className="text-base ml-4">
              <p className="font-medium dark:text-white">Twitter</p>
              <p className="dark:text-slate-200">Social Network</p>
            </div>
          </div>
          <IconButton>
            <HiPencil className="dark:text-white" />
          </IconButton>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <AiFillLinkedin className="dark:text-white" />
            <div className="text-base ml-4">
              <p className="font-medium dark:text-white">Linkedin</p>
              <p className="dark:text-slate-200">Network Platform</p>
            </div>
          </div>
          <IconButton>
            <HiPencil className="dark:text-white" />
          </IconButton>
        </div>
      </div>
    </WidgetWrapper>
  );
};

export default UserWidget;
