import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import './Playlist.css'
import Playlistdetails  from '../Inplaylist/Playlistdetails'


const localCache =()=>{
   let list= localStorage.getItem('lists')
   if(list)
   {
       return JSON.parse(localStorage.getItem('lists'))
   }
   else{return []}
}

const localCachesonglist =()=>{
  
    let list1= localStorage.getItem('songlist')

    if( list1)
    {
        return JSON.parse(localStorage.getItem('songlist'))
    }
    else{return []}
 }



const Playlist = () => {
    
    const[input,setInput]=useState('')
    const[playlist,setPlaylist]=useState(localCache())
    const[gate,setGate]=useState(false)
    const[filterdata,setFilterData]=useState([])
    const[songlist,setSonglist]=useState(localCachesonglist())
    const[check,setCheck]=useState(false)
    const[data,setData]=useState([])

   
function handleSonglist(Name){
    let data1=songlist.filter((item)=>{
      return item.Name===Name
    })
    if(data1.length>=1){
      setCheck(true)
       setData(data1)
                }
   else{
       setData([])
      }
}


 function handlePlaylistdetails(id,Name){
     setGate(true)
    
  let data2=playlist.filter((item)=>{
      return item.key===id
     
  })
  
 setFilterData(data2)

}



    function createPlaylist(){
        if(!input)
        { }
        else{
            let key=Math.random()*10
          let  date=new Date().toLocaleDateString()
         
         setPlaylist( [...playlist,{key,Name:input,date}])
         setInput('')        
        }
    }
function Removesong(title,Name){
    let result=songlist.filter((item)=>{
        return item.title!==title || item.Name!==Name
    })
    setSonglist(result)
    setData(result)
    //setCheck(true)
}
//console.log(playlist)
function Removeplaylist(Name){
let result =playlist.filter((item)=>{
       return item.Name !== Name
})
setPlaylist(result)

}

    useEffect(()=>{
     localStorage.setItem('lists',JSON.stringify(playlist))

    },[input,playlist])

    
    useEffect(()=>{
        localStorage.setItem('songlist',JSON.stringify(songlist))
   
       },[songlist])
   

   
    return (
        <>
        <div className="playlist"> 
       { gate && <div className="bt1"> <button onClick={()=>{ setCheck(false) ; setGate(false)}}>Back</button></div>} 
       {playlist && !gate &&
        <>
        <div className="create">
         <input  onChange={(e)=>{setInput((e.target.value).toLocaleUpperCase().trim())}} value={input}    type="text" placeholder="Playlist Name"></input>
        <button  onClick={createPlaylist}  >Create Playlist</button>
        </div> 
       </>}
          
        {

          check&&  data && data.map((item,key)=>{
            
                return(<>
                   <div valu={key} className="content">
                    <h1><span className="span"> Title:</span> {item.title} <span className="spn">Play</span>   <button onClick={()=>{Removesong(item.title,item.Name)}} className="b">Remove</button> </h1>
                    
                 </div>
                </>)
            })
        }
        {gate &&  <Playlistdetails  value={[filterdata,  data]}/>}
        {playlist &&  !gate && playlist.map((item,id)=>{
            
             return(
                 <>
                 <div key={id} className="playlist1">
                 <button   onClick={()=>{handlePlaylistdetails(item.key); handleSonglist(item.Name)} } className="bt1">Playlist:{id+1}</button>
                     <span   className="spn1">{item.Name}</span>
                     <span    className="spn2">Created At:   {item.date}  <button onClick={()=>{Removeplaylist(item.Name)}} className="remove">Remove</button>  </span>
                         <br></br>
                    
                
                 </div>
              
               </>
           )
        })}
        
     
        </div>
    
     
        </>
    )
}

export default Playlist
