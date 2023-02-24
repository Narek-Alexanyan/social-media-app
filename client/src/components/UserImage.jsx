const UserImage = ({ image, size = "60px" }) => {
  return (
    <div style={{ width: size, height: size }}>
      <img
        style={{ width: size, height: size, minWidth: size }}
        className="object-cover rounded-full"
        src={`http://localhost:3001/assets/${image}`}
        alt="user"
      />
    </div>
  );
};

export default UserImage;
