import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Index;
