import axios from "axios";
import { useState,useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from "@mui/system";
import { Grid } from "@mui/material";
import AddMenu from "./AddMenu";
import AddModal from "./AddModal";
import { Modal } from "@mui/material";
import BasicModal from "./BasicModal";
import { useNavigate } from "react-router-dom"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import UndoIcon from '@mui/icons-material/Undo';
const baseURL="https://27.133.154.129/api/v1";


function BasicCard({id,name,target,weight,isJoint,link,menus,setMenus}) {
    return (
      <Card sx={{ minWidth: 600,maxWidth:800,m:2}}>
        <CardContent>
          <Typography sx={{ fontSize: 25 }} color="text.secondary" >
            {name}
          </Typography>
          <Typography sx={{ mb: 1 ,fontSize:20}} color="text.secondary">
            {target}
          </Typography>
          <Typography variant="body2" sx={{fontSize:20}}>
            {(isJoint===true)?"多関節":"単関節"}
            <br />
          </Typography>
          <Typography variant="body2" sx={{fontSize:20}}>
            {weight} kg
            <br />
          </Typography>
          {
              link===""? <Button disabled={true}></Button>: <Button size="small" href={link}>Learn More</Button>
          }
        </CardContent>
        <CardActions sx={{textAlign:"center"}}>
          <BasicModal 
          menuName={name}
          part={target}
          weight={weight}
          joint={isJoint}
          detail={link}
          menus={menus}
          setMenus={setMenus}
          id={id}
          />
        </CardActions>
      </Card>
    );
  }

const TrainingMenu=()=>{
    const navigate = useNavigate()
    const[menus,setMenus]=useState([]);
    const [display,setDisplay]=useState([]);
    const [target,setTarget]=useState("all");
    const [isJoint,setIsJoint]=useState("all");
    const handleTargetChange = (event) => {
        setTarget(event.target.value);
    };
    const handleIsJointChange = (event) => {
        setIsJoint(event.target.value);
    };
    const handleSearch = () => {
        if(target==="all"&&isJoint==="all"){
            setDisplay(menus)
        }else if(target==="all" && isJoint!=="all"){
            const bool=(isJoint==="多関節")
            setDisplay(menus.filter(e=>e.isJoint===bool))
        }else if(target!=="all" && isJoint==="all"){
            setDisplay(menus.filter(e=>e.target===target))
        }else{
            const bool=(isJoint==="多関節")
            setDisplay(menus.filter(e=>e.target===target&&e.isJoint===bool))
        }
    }
    
    useEffect(()=>{
        async function getMenus(){
            const result=await axios.get(baseURL+"/menus")
            console.log(result.data)
            setMenus(result.data);
            setDisplay(result.data);
        }
        getMenus();
    },[])
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
    return(
        <>
            <Typography variant="h1">メニューリスト</Typography>
            <Button onClick={() => navigate('/componentb')} sx={{m:2}} variant="contained">
                <UndoIcon fontSize="large"/>
                    <Typography variant="h6">
                        トップに戻る
                    </Typography>
                
            </Button>

            <Grid direction="row" alignItems="center" justifyContent="center" sx={{m:2}}>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">部位</InputLabel>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={target}
                            onChange={handleTargetChange}
                            label="Age"
                            >
                            
                            <MenuItem value={"all"}>全て</MenuItem>
                            <MenuItem value={"胸"}>胸</MenuItem>
                            <MenuItem value={"背中"}>背中</MenuItem>
                            <MenuItem value={"肩"}>肩</MenuItem>
                            <MenuItem value={"腕"}>腕</MenuItem>
                            <MenuItem value={"脚"}>脚</MenuItem>
                            <MenuItem value={"腹筋"}>腹筋</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">種目構成</InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={isJoint}
                            onChange={handleIsJointChange}
                            >
                            <MenuItem value={"all"}>全て</MenuItem>
                            <MenuItem value={"多関節"}>多関節</MenuItem>
                            <MenuItem value={"単関節"}>単関節</MenuItem>
                            </Select>
                        </FormControl>
                        <Grid alignItems="center" justifyContent="center" display="inline-block" sx={{verticalAlign:"middle",margin:"inherit"}}> 
                            <Button variant="contained" color="primary" onClick={handleSearch} sx={{alignItems:"center"}}>
                                <SearchIcon />
                            </Button>
                        </Grid>
                    </Grid>

            <AddModal setMenus={setMenus} menus={menus}/>
            <Grid container alignItems="center" justifyContent="center">
                {
                    display.map(menu => {
                        return (
                            <BasicCard key={menu.id} {...menu} menus={menus} setMenus={setMenus}/>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export default TrainingMenu;
