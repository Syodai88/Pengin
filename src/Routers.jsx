import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponentA from "./Component/ComponentA";
import ComponentB from "./Component/ComponentB";
import TrainingMenu from "./Component/TrainingMenu";
import Daiary from "./Component/Daiary";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ComponentA/>}/>
                <Route path="/componentb" element={<ComponentB/>}/>
                <Route path="/menulist"element={<TrainingMenu/>}/>
                <Route path="/daiary" element={<Daiary/>}/>
            </Routes>
        </BrowserRouter>
        
    );
}
export default Routers;