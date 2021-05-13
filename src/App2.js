import React,{useState, useEffect} from "react"
import io from "socket.io-client"



function App() {

const servers ={
iceServers: [
{

urls: [

"stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"

]
}

],

iceCandidatePoolSize:10



};

const [sock, setSock] = useState(io("http://localhost:8000"));
const ref = React.useRef(null)
const [message,setMessage] = useState("Unavailable");
const [connected, setConnected] = useState(false)
const [text, setText] = useState("");


useEffect(()=>
{

setText(text + ' ' + message);


},[message])


const onRemoteDataChannel = (event) => {
    let _remoteChannel;
    console.log(`onRemoteDataChannel: ${JSON.stringify(event)}`);
    window.remoteChannel = _remoteChannel = event.channel;
    _remoteChannel.binaryType = 'arraybuffer';
//    _remoteChannel.addEventListener('message', onRemoteMessageReceived);

_remoteChannel.addEventListener('message', onRemoteMessageReceived);

  _remoteChannel.addEventListener('close', () => {
      console.log('Remote channel closed!');
      setConnected(false);
    });

setMessage("rem")
setConnected(true);
window.channel=_remoteChannel;
  }




const onRemoteMessageReceived = (event) => {
    console.log(`Remote message received by local: ${event.data}`);
    setMessage(message+ ' ' + event.data + '\n');
  }



useEffect(()=> 
{

window.sId = sock.id


if(sock){

if(!window.connection){

window.connection = new RTCPeerConnection(servers);




window.connection.addEventListener('icecandidate', async e => {
if(!e.candidate)return;

sock.emit("data-tran",JSON.stringify(

{socketId:window.sId,
data: e.candidate,
type:"candid",
room: 'lion'

}
)

)

})


}




sock.on("connect", m=> {
setMessage("yeyy")
sock.emit("join-room","lion");
})


sock.on("createOffer",()=>
{

const dataChannelParams = { ordered: true };


window.channel = window.connection.createDataChannel('messaging-channels', dataChannelParams)
window.channel.binaryType = "arraybuffer";
window.channel.onopen =  (e) => {




      console.log('connected on local channel')
      setConnected(true);
    }

window.channel.addEventListener('message', onRemoteMessageReceived)
setMessage("offer");
window.connection.createOffer().then(answr=>{

window.connection.setLocalDescription(answr);
//nection setLocalDescription(answr
sock.emit("data-tran",
JSON.stringify(
{
socketId:window.sId,
type:"offer",
data:answr,
room:"lion"

}

)

)

})




})



sock.on("data-rec",(d)=>{
const ans = JSON.parse(d);


if(ans.type=="candid")
{

window.connection.addIceCandidate(ans.data)
.then(console.log)

}

else if(ans.type=="offer"){


window.connection.setRemoteDescription(ans.data);

window.connection.createAnswer().then((answr)=>

{
setMessage("answers");

window.connection.setLocalDescription(answr);
//nection setLocalDescription(answr
sock.emit("data-tran",
JSON.stringify(
{
socketId:window.sId,
type:"answer",
data:answr,
room:"lion"

}

)

)

})
.catch(err=>{
setMessage(err.message || "lol");

})

//setMessage("ans");
window.connection.addEventListener('datachannel', onRemoteDataChannel);


}

else if(ans.type=="answer"){
window.connection.setRemoteDescription(ans.data);

setMessage("ans")

}

})


}
},[])


  return (
    <div className="App">
 
<p>


{text}



</p>
<p>

{connected.toString()}

</p>


<textarea ref={ref}></textarea>
<br/>
<button
disabled={!connected}
onClick={()=>{
if(ref.current){
if(window.channel)window.channel.send(ref.current.value);
if(window.channel)alert("send");

}

}

}

>Send

</button>

    </div>
  );
}

export default App;
