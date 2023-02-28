import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { spacing } from '@mui/system';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const baseURL="https://27.133.154.129/api/v1";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    const [daiary,setDaiary]=useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        async function getDaiary(){
            const result=await axios.get(baseURL+"/daily/all");
            console.log(result.data);
            setDaiary(result.data);
        }
        getDaiary();
    },[])
  return (
    <Grid>
        <Typography variant="h1" sx={{m:3}}>
            筋トレ記録
        </Typography>
        <Button onClick={() => navigate('/componentb')}>
            ホームに戻る
        </Button>
        {
            daiary.map((item,index)=>{
                return(
                    <TableContainer key={index} component={Paper} sx={{ minWidth: 650, maxWidth:1000,mx:"auto",my:2}} >
                    <Typography variant='h3' align='left' sx={{marginLeft:3}}>
                        {item[0].date}
                    </Typography>
                    <Table sx={{ minWidth: 650, maxWidth:1000}} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>メニュー名</TableCell>
                            <TableCell align="right">部位</TableCell>
                            <TableCell align="right">種目構成</TableCell>
                            <TableCell align="right">重量&nbsp;(kg)</TableCell>
                            <TableCell align="right">回数&nbsp;(回)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {item.map((e) => (
                            <TableRow
                            key={e.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {e.menu.name}
                            </TableCell>
                            <TableCell align="right">{e.menu.target}</TableCell>
                            <TableCell align="right">{e.menu.isJoint?"多関節":"単関節"}</TableCell>
                            <TableCell align="right">{e.weight}</TableCell>
                            <TableCell align="right">{e.count}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                )
            })
        }
    </Grid>
  );
}