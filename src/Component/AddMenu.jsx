import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react"
import MenuList from "./MenuList";
import { TextField } from "@mui/material";



const AddMenu=()=>{
    const [menuName,inputMenuName]=useState("");
    const [detail,inputDetail]=useState("");
    const [weight,inputWeight]=useState("");
    const parts=["胸","背中","腕","肩","脚","腹筋"];
    const [part,setPart]=useState("胸");
    const joints=["多関節","短関節"];
    const [joint,setJoint]=useState("多関節");
    const [menus,setMenus]=useState([]);

    const handleAddMenu=()=>{
        if(menuName===""){
            alert("メニュー名を入力してください");
        }else if(weight===""){
            alert("重量を入力してください");
        }else if(weight<0){
            alert("重量は0以上で入力してください");            
        }else{
            const newMenu={
                menuName:menuName,
                part:part,
                joint:joint,
                weight:weight,
                detail:detail
            }
            menus.push(newMenu);
            const newMenus=[...menus];
            setMenus(newMenus);

            inputMenuName("");
            inputDetail("");
            inputWeight("");
            setPart("胸");
            setJoint("多関節");
        }
    } 
    return(
        <div className="inputForm">
            <Typography variant="h3" textAlign={"left"}>メニュー追加</Typography>
            <Stack direction="row" spacing={2}>
                <Typography variant="h5" align="left">メニュー名：</Typography>
                <TextField
                type="text" 
                name="menuName" 
                value={menuName} 
                onChange={(e)=>{inputMenuName(e.target.value)}}
                >
                </TextField>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Typography variant="h5">部位：</Typography>
                {parts.map((e) => {
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
                })}
            </Stack>
            <Stack direction="row" spacing={2}>

            <Typography variant="h5">重量(Kg)：</Typography>
                <TextField
                type="number" 
                name="weight"
                step="0.5"
                min="0" 
                value={weight}
                onChange={(e)=>{inputWeight(e.target.value)}}
                />
            </Stack>
            <Stack direction="row" spacing={2}>
                <Typography variant="h5">種目構成：</Typography>
                {joints.map((e) => {
                    return (
                        <label key={e}>
                            <input
                            type="radio"
                            value={e}
                            checked={joint === e}
                            onChange={(e) => setJoint(e.target.value)}
                            />
                            {e}
                        </label>
                        );
                })}
            </Stack>
            <Stack direction="row" spacing={2}>
                <Typography variant="h5">リンク</Typography>
                <TextField 
                type="text" 
                name="detail" 
                value={detail}
                onChange={(e)=>{inputDetail(e.target.value)}}
                />

            </Stack>
            <Stack direction="row" spacing={2}>
                <Button onClick={handleAddMenu} variant="contained" align="left">追加</Button>
            </Stack>
    
            <br/>
            <ul style={{listStyle:"none"}}>
                {menus.map((item,index) => {
                    return (
                        <li key={index}>
                            <MenuList 
                            menuName={item.menuName} 
                            part={item.part} 
                            joint={item.joint} 
                            weight={item.weight} 
                            detail={item.detail} 
                            index={index}
                            menus={menus}
                            setMenus={setMenus}
                            />
                        </li>
                        );
                })}
            </ul>
        </div>
    );

}
export default AddMenu;