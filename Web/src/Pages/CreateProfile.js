import {useNavigate} from "react-router-dom";

const CreateProfile = () =>{
    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/CreateProfile")
    };

    return (
        <div>
        <h1>Haha nic tu nie ma :DD</h1>
    </div>
    )
};

export default CreateProfile;