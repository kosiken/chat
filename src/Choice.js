import React, {useState} from 'react'
import Chat from './pages/Chat';
import Chat2 from './pages/Chat2';


const Choice = () => {
    const [selected, setSelected] = useState("");
    if(selected === "" || selected === "none") {
        return (
            <div>
                <select defaultValue="none" onChange= {(e)=> {
setSelected(e.target.value)
                }}>
                    <option value="none"> _ </option>
                <option value="Chat1">Chat with inhouse</option>
  <option value="Chat2">Chat with twilio video</option>
  
                </select>
            </div>
        )
    }
else if(selected === "Chat1") return <Chat />
    else if(selected === "Chat2") return <Chat2/>
    return (
        <div>
            <p>
                An error must have occured
            </p>
        </div>
    )
}

export default Choice
