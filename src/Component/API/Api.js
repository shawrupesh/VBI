import React from 'react'
import '../../App.css'
import './Api.css'
import { useEffect ,useState} from 'react'
import Playlist from '../Playlist/Playlist'


const Api = () => {
const [album, setalbum] = useState([])
const [playlist, setplaylist] = useState(false)
const[input,setInput]=useState('')

useEffect(()=>{
fetch('https://jsonplaceholder.typicode.com/albums').then((response)=>response.json()).then((albums)=>{
     // console.log(albums)
      setalbum(albums)
})
},[])

function handlePlaylist(){
    setplaylist(true)      
}

function handleAllsong(){
 setplaylist(false)
}

  return (
      
  
     <div className="vb">
            
   <button onClick={handleAllsong} className="button">ALL SONGS</button> 
           <button  onClick={handlePlaylist} className="button">PLAYLISTS</button>
           { !playlist && <div   className="serach"> <input onChange={(e)=>{setInput(e.target.value)}} value={input} type="text" placeholder="search song,artists"></input></div>}
           
           {!playlist ? album.filter((val)=>{
                    if(input==='')
                    {
                        return  val
                    }
                    else if(val.title.toLowerCase().includes(input.toLowerCase()))
                        {
                            return val
                        }   

                     }).map((item,index)=>{
                         console.log(item)

               return(
                <div key={index} className="content">
              
                    <h1 className="h1"><span className="span"> Title: </span> {item.title} <span className="play">Play Time</span>   </h1>
                   
                 </div>
               )
           }): <Playlist/>}
        
       </div> 
    
       
    )
    
        
    
  
}

export default Api
