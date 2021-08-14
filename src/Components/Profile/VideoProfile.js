import React from 'react'
import ReactDOM  from 'react-dom';
import './../Video.css'
export default function Video(props) {

    const handlePlay = (e)=>{
       let el = e.target;

       if(el.paused){
           el.play();
           
       }
       else{
           
           el.pause();
       }
       e.target.muted = !e.target.muted;
       
    }

    const handleAutoScroll =(e)=>{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(next){
            next.scrollIntoView({behaviour:'smooth'})
            e.target.muted  = true;
        }
    }
    return (
       <>
       <video onEnded ={handleAutoScroll} src = {props.source} className='Pvideo-styles' onClick={handlePlay} muted = 'muted' type = 'video/mp4'></video>
       </>
    )
}
