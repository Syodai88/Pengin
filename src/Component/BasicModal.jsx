import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import axios from 'axios';
import { Grid } from '@mui/material';
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

const BasicModal=({menuName,part,joint,weight,detail,index,menus,setMenus,id})=> {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reMenuName,inputMenuName]=useState(menuName);
  const[reWeight,inputWeight]=useState(weight);
  const [reDetail,inputDetail]=useState(detail);
  const joints=["多関節","単関節"];
  const [reJoint,setJoint]=useState(joint);
  const parts=["胸","背中","腕","肩","脚","腹筋"];
  const [rePart,setPart]=useState(part);
  const handleMenuUpdata=async()=>{
    const result=await axios.put(baseURL+"/menus/"+id,{
      name:reMenuName,
      weight:reWeight,
      link:reDetail,
      isJoint:reJoint,
      target:rePart
    })
    console.log(result.data);
    const newMenus=[...menus];
    setMenus(
      newMenus.map((menu)=>{
        if(menu.id===id){
          menu.name=reMenuName;
          menu.weight=reWeight;
          menu.link=reDetail;
          menu.isJoint=reJoint;
          menu.target=rePart;
        }
        return menu;
      })
    )
    handleClose();
  }
  const handleMenuDelete=async()=>{
    const result=await axios.delete(baseURL+"/menus/"+id);
    console.log(result.data);
    const newMenus= await [...menus];
    setMenus(
      newMenus.filter(menu=>menu.id!==id)
    )
    handleClose();
  }

  return (
    <div>
      <Grid item direction="row" alignItems="center" justifyContent="center">
        <Button onClick={handleOpen} variant="outlined">編集</Button>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            編集画面
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              メニュー名：<input 
                            type="text" 
                            name='reMenuName'
                            value={reMenuName} 
                            onChange={(e)=>{inputMenuName(e.target.value)}}
                        />
                <br/>
                部位：{parts.map((e) => {
                        return (
                            <label key={e}>
                                <input
                                type="radio"
                                value={e}
                                checked={rePart === e}
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
                                    checked ={(reJoint?"多関節":"単関節") === e}
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
                        value={reWeight}
                        onChange={(e)=>{inputWeight(e.target.value)}}
                    /> kg
                <br/>
                詳細：<input 
                        type="text" 
                        name="reDetail" 
                        value={reDetail}
                        onChange={(e)=>{inputDetail(e.target.value)}}
                    />
                    <br/>
          </Typography>
          <Button onClick={handleMenuDelete}variant="outlined">削除</Button>
          <Button onClick={handleMenuUpdata}variant="outlined">更新</Button>
        </Box>
      </Modal>
    </div>
  );
}
export default BasicModal;