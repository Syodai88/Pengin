import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <MenuIcon size="large" edge="start" color="inherit"sx={{ mr: 2 }}/>
            <Typography variant="h5" component="div" sx={{ flexGrow: 0 } }>
                筋トレ管理アプリ
            </Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">メニュー追加</Button>
            <Button color="inherit">トレーニングメモ</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}