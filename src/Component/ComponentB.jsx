import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material";
import { AppBar } from "@mui/material";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Split from "react-split";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material";
import Radio from '@mui/material/Radio';
import { Checkbox } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddDailyModal from "./AddDailyModal";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
const baseURL="https://27.133.154.129/api/v1";

function BasicCard({id,name,target,weight,isJoint,link,menus,setMenus,daily,setDaily}) {
    const [selected,setSelected]=useState(false);
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
          <AddDailyModal id={id} name={name} weight={weight} daily={daily} setDaily={setDaily}/>

        </CardContent>
      </Card>
    );
  }

const ComponentB = () => {
    const navigate = useNavigate()
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const [daily,setDaily]=useState([]);
    const [menus,setMenus]=useState([]);
    const [display,setDisplay]=useState([]);
    const [target,setTarget]=useState("all");
    const [isJoint,setIsJoint]=useState("all");
    useEffect(()=>{
        async function getDailyMenus(){
            const result= await axios.get(baseURL+"/daily?date="+year+"-"+month+"-"+date)
            console.log(result.data)
            setDaily(result.data)
            const result2=await axios.get(baseURL+"/menus")
            console.log(result2.data)
            setMenus(result2.data);
            setDisplay(result2.data);
        }
        getDailyMenus()
    },[])

    const handleDeleteDailyMenu=async(dailyId)=>{
        const result= await axios.delete(`${baseURL}/daily/${dailyId}`)
        console.log(result.data)
        const newDaily=[...daily];
        setDaily(
            newDaily.filter(e=>e.id!==dailyId)
        )
    }
    const [age, setAge] = useState('');

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

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <FitnessCenterIcon size="large" edge="start" color="inherit"sx={{ mr: 2 }}/>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 0 } }>
                            筋トレ管理アプリ
                        </Typography>
                        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                        <Button color="inherit" onClick={() => navigate('/menulist')}>トレーニングメニュー</Button>
                        <Button color="inherit" onClick={()=>navigate('/daiary')}>筋トレ記録</Button>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 } }>
                            {year}年{month}月{date}日
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Split sizes={[50,50]} style={{display:"flex"}}>
                <TableContainer component={Paper} sx={{m:2}}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>メニュー名</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right">重量&nbsp;(kg)</TableCell>
                            <TableCell align="right">回数</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {daily.map((e) => (
                            <TableRow
                            key={e.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {e.menu.name}
                            </TableCell>
                            <TableCell align="right">
                                <Button color="inherit" onClick={() => {handleDeleteDailyMenu(e.id)}}>
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                            <TableCell align="right">{e.weight}</TableCell>
                            <TableCell align="right">{e.count}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Grid container alignItems="center" justifyContent="center" direction="column">
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
                    {
                        display.map(menu => {
                            return (
                                <BasicCard key={menu.id} {...menu} menus={menus} setMenus={setMenus} daily={daily} setDaily={setDaily}/>
                            )
                        })
                    }
                </Grid>
            </Split>
        </div>
    );
}
export default ComponentB;