import { useNavigate } from "react-router-dom"
import hedgehog from "./IMG_1354.JPG";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';


const ComponentA = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Typography variant="h2" sx={{m:3}} fontStyle="oblique">Let's Training Together</Typography>
            <Button onClick={() => navigate('/componentb')}  >
                <ThumbUpAltOutlinedIcon fontSize="large" />
                <Typography variant="body2" sx={{m:1}} >
                    Start Training
                </Typography>
            </Button>
            <div style={{textAlign: "center"}}>
                <img src={hedgehog}  style={{width:700,height:700,margin:"auto"}}/>
            </div>
        </div>
    );
}
export default ComponentA;