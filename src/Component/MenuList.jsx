import { useState } from "react";
import BasicModal from "./BasicModal";

const MenuList=({menuName,part,joint,weight,detail,index,menus,setMenus})=>{
    const[showModal,setShowModal]=useState(false);
    const handleMenuDelete=()=>{
        const newMenus=[...menus];
        newMenus.splice(index,1);
        setMenus(newMenus);
    };
    return(
        <div>
            <p>{menuName}</p>
            <p>{part}</p>
            <p>{joint}</p>
            <p>{weight}</p>
            <p>{detail}</p>
            <BasicModal 
            menuName={menuName}
            part={part}
            joint={joint}
            weight={weight}
            detail={detail}
            index={index}
            menus={menus}
            setMenus={setMenus}
            />
        </div>
    )
}
export default MenuList;