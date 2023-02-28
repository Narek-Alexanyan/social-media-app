import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import SearchField from "../../UI/SearchField";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPost } from "../../state/postSlice";
import {
  HiOutlinePhotograph,
  HiOutlineTrash,
  HiOutlinePaperClip,
  HiOutlineMicrophone,
} from "react-icons/hi";
import { AiOutlineGif, AiOutlineMore } from "react-icons/ai";
import SimpleButton from "../../UI/buttons/SimpleButton";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.auth.user);
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    try {
      dispatch(sendPost(formData));

      setImage(null);
      setPost("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center">
        <UserImage image={picturePath} />
        <SearchField
          className="w-full py-3 rounded-2xl ml-4"
          placeholder="What's on your mind..."
          icon={false}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </div>
      {isImage && (
        <div className="border border-slate-100 mt-4 p-4">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="flex justify-between items-center">
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed transition-colors border-slate-100 hover:border-slate-300 p-4 w-full cursor-pointer"
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p className="text-base dark:text-white">Add Image Here</p>
                  ) : (
                    <div className="flex justify-between items-center">
                      <p className="text-base dark:text-white">{image.name}</p>
                    </div>
                  )}
                </div>
                {image && (
                  <button onClick={() => setImage(null)}>
                    <HiOutlineTrash className="dark:text-white" />
                  </button>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}

      <span className="w-full h-[1px] bg-black dark:bg-slate-100 inline-block my-4"></span>

      <div className="flex justify-between items-center">
        <div
          className="flex justify-between items-center"
          onClick={() => setIsImage(!isImage)}
        >
          <HiOutlinePhotograph className="dark:text-white" />
          <p className="text-base text-black dark:text-slate-100 cursor-pointer ml-2">
            Image
          </p>
        </div>
        {isMobileScreen ? (
          <div className="flex justify-between items-center">
            <AiOutlineMore className="dark:text-white" />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <AiOutlineGif className="dark:text-white" />
              <p className="text-base text-black dark:text-slate-100 cursor-pointer ml-2">
                Clip
              </p>
            </div>
            <div className="flex justify-between items-center">
              <HiOutlinePaperClip className="dark:text-white" />
              <p className="text-base text-black dark:text-slate-100 cursor-pointer ml-2">
                Attachment
              </p>
            </div>
            <div className="flex justify-between items-center">
              <HiOutlineMicrophone className="dark:text-white" />
              <p className="text-base text-black dark:text-slate-100 cursor-pointer ml-2">
                Audio
              </p>
            </div>
          </>
        )}
        <div className="w-32">
          <SimpleButton disabled={!post} onClick={handlePost}>
            Post
          </SimpleButton>
        </div>
      </div>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
