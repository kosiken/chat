/* eslint-disable */


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MainView from "./MainView"
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import "./App.css"
import TypingBox from "./TypingBox"

import Input from '@material-ui/core/Input';


const useStyles = makeStyles((theme) => ({
  root: {
    
height:"100vh",
width:"100vw",

display:"flex",
alignItems:"center",
justifyContent:"center"

},

paper:{
border:"none"

},
}))



const App = () =>

{
const ref = React.useRef(null)
const classes = useStyles();
const [me, setMe] = React.useState("")
const [hasName, setHasName] = React.useState(false)

React.useEffect(()=>{
if(me && me.length){
setHasName(true);
}


},[me])



//return <TypingBox/>


if(hasName) return <MainView user={me} />
else return (
<div className={classes.root} >
<Paper>

<Input placeholder="Your Name" inputRef={ref} />
<div>
<Button variant="contained" color="primary" 
onClick={()=> {
if(ref.current){
setMe(ref.current.value);

}

}
}

>

Continue


</Button>
</div>

</Paper>


</div>
)

}



export default App;
