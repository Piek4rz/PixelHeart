import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/CreateProfile");
  };

  return (
    <>
      <div>
        <h1>diupadsa</h1>
        <h1>diupadsa</h1>
      </div>
    </>
  );
};

export default CreateProfile;
