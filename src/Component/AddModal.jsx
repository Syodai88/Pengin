import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import CheckIcon from '@mui/icons-material/Check';

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

const AddModal=({setMenus,menus})=> {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [menuName,inputMenuName]=useState("");
  const [detail,inputDetail]=useState("");
  const [weight,inputWeight]=useState("");
  const parts=["胸","背中","腕","肩","脚","腹筋"];
  const [part,setPart]=useState("胸");
  const joints=["多関節","短関節"];
  const [joint,setJoint]=useState("多関節");

  const handleAddMenu=async()=>{

      if(menuName===""){
          alert("メニュー名を入力してください");
      }else if(weight===""){
          alert("重量を入力してください");
      }else if(weight<0){
          alert("重量は0以上で入力してください");            
      }else{
          const result=await axios.post(baseURL+"/menus",{
              name:menuName,
              target:part,
              weight:Number(weight),
              isJoint:joint==="多関節",
              link:detail
          })
          console.log(result.data);
          setMenus([...menus,result.data]);
          inputMenuName("");
          inputDetail("");
          inputWeight("");
          setPart("胸");
          setJoint("多関節");
          handleClose();
      }
  }  

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
          <CreateIcon />
            <Typography variant="h6" >
                新規メニュー
            </Typography>
      </Button>
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
              メニュー名：<input 
                            type="text" 
                            name='MenuName'
                            value={menuName} 
                            onChange={(e)=>{inputMenuName(e.target.value)}}
                        />
                <br/>
                部位：{parts.map((e) => {
                        return (
                            <label key={e}>
                                <input
                                type="radio"
                                value={e}
                                checked={part === e}
                                onChange={(e) => setPart(e.target.value)}
                                />
                                {e}
                            </label>
                            );
                        })} <br/>
                種目構成：{joints.map((e) => {
                            return (
                                <label key={e}>
                                    <input
                                    type="radio"
                                    value={e}
                                    checked ={joint === e}
                                    onChange={(e) => setJoint(e.target.value)}
                                    />
                                    {e}
                                </label>
                                );
                        })} 
                <br/>
                重量：<input 
                        type="number" 
                        name="reWeight"
                        step="0.5"
                        min="0" 
                        placeholder='50'
                        style={{width:"50px"}}
                        value={weight}
                        onChange={(e)=>{inputWeight(e.target.value)}}
                    /> kg
                <br/>
                詳細リンク：<input 
                        type="text" 
                        name="reDetail" 
                        placeholder='https://PenguinHack'
                        value={detail}
                        onChange={(e)=>{inputDetail(e.target.value)}}
                    />
                    <br/>
          </Typography>
          <Button onClick={handleAddMenu}variant="contained" color='success'>
              <CheckIcon color="inherit"/>

          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export default AddModal;