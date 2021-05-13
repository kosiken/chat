/* eslint-disable */
import React,{useState, useEffect} from "react"


//import "./App.css";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';
import DirectionsIcon from '@material-ui/icons/Directions';




const useStyles = makeStyles((theme) => (

{
root:{
width: "100%",
position:"absolute",
padding: "0 10px",
bottom:0,
left:0,
padding: "15px",
display:"flex",
shadow:"none",
border:"none"
},


input: {
    marginLeft: theme.spacing(1),
maxHeight:"25vh",





flex: 1,
"& div,p":{
 margin:0,
padding:0
},

"& pre":{
    whitespace:"pre-wrap"


},
"&:focus":{


outline: "none",
border:"none"

}





  },
iconButton: {
    padding: 10,
  }
}

)

)



const TypingBox = ({onSubmit}) => {
const ref = React.useRef(null);
const classes = useStyles();


const onSend= function(){

if(ref.current){
    

if(onSubmit) onSubmit(ref.current.textContent)

ref.current.textContent = ""



}


}




  return (
    <Paper className={classes.root}>

<IconButton className={classes.iconButton} aria-label="menu" onClick= {()=>{



}}
>


        <DirectionsIcon/> 

     </IconButton>



<div 
contenteditable
contentEditable

ref={ref}
      

  className={classes.input}

        placeholder="Search Google Maps"
           >
{"Type here"}

</div>
<IconButton color="primary" className={classes.iconButton} aria-label="directions" 

onClick={onSend}

>

        <SendIcon/>

      </IconButton>

</Paper>




)

}
export default TypingBox
