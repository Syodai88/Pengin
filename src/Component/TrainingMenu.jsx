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
          <Button size="small">Learn More</Button>
        </CardContent>
        <CardActions>
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
    
    useEffect(()=>{
        async function getMenus(){
            const result=await axios.get(baseURL+"/menus")
            console.log(result.data)
            setMenus(result.data);
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
            <Typography variant="h1">メニュー一覧</Typography>
            <Button onClick={() => navigate('/componentb')}>ホームに戻る</Button>
            <AddModal setMenus={setMenus} menus={menus}/>
            <Grid container alignItems="center" justifyContent="center">
                {
                    menus.map(menu => {
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
