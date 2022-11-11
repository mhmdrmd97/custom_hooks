import { useEffect } from 'react';
import { signal } from "@preact/signals-react";


const myData = signal([])


const useSocket = ({socketUrl,event,channel}) => {
    
    //subscription object
      const subscribe = {event, data:{channel}};                           
    
    useEffect(() => {
//handshake
const ws = new WebSocket(socketUrl);

      //on connection      
      ws.onopen = () => { ws.send(JSON.stringify(subscribe));};
      
      //on recieving data
      ws.onmessage = ({data}) => {myData.value = JSON.parse(data).data};
      
      //onclose
      ws.onclose = () => { ws.close() };
      
      //on unmount
      return () => { ws.close() };
    }, [channel]);
        
    //returning component
    return {myData}
};

export default useSocket;
