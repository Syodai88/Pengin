import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import axios from 'axios';

const baseURL="https://27.133.154.129/api/v1";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddDailyModal=({id,name,target,weight,isJoint,link,menus,setMenus,daily,setDaily})=> {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [menuName,inputMenuName]=useState(name);
  const [menuWeight,inputMenuWeight]=useState(weight);
  const [count,setCount]=useState(0);
  const handleAddDailyMenu=async()=>{
      if(weight===""){
          alert("重量を入力してください");
      }else if(weight<0){
          alert("重量は0以上で入力してください");
      }else if(count===""){
          alert("回数を入力してください");            
      }else if(count<0){
        alert("回数は0以上で入力してください");
      }else{
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const date = today.getDate()
          const result=await axios.post(baseURL+"/daily/"+id,{
            weight: Number(menuWeight),
            count: Number(count),
            date: `${year}-${month}-${date}`
          })
          console.log(result.data);
          setDaily([...daily,result.data]);
          
          handleClose();
      }
  }  

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">今日のメニューに追加</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            追加画面
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              メニュー名：{name}
                <br/>
                重量：<input 
                        type="number" 
                        name="reWeight"
                        step="0.5"
                        min="0" 
                        value={menuWeight}
                        onChange={(e)=>{inputMenuWeight(e.target.value)}}
                    /> kg
                <br/>
                回数：<input 
                        type="number" 
                        name="reWeight"
                        step="1"
                        min="0" 
                        value={count}
                        onChange={(e)=>{setCount(e.target.value)}}
                    /> 回
                    <br/>
          </Typography>
          <Button onClick={handleAddDailyMenu}variant="outlined">完了</Button>
        </Box>
      </Modal>
    </div>
  );
}
export default AddDailyModal;