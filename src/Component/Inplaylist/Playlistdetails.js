import React from 'react'
import { useEffect, useState } from 'react'
import './Playlistdetail.css'

const localCachesonglist =()=>{
  
    let list1= localStorage.getItem('songlist')

    if( list1)
    {
        return JSON.parse(localStorage.getItem('songlist'))
    }
    else{return []}
 }

const Playlistdetails = (props) => {

const[song,setSong]=useState([])
const[option1,setOption]=useState()
const[songlist,setSonglist]=useState(localCachesonglist())


const num=props.value[1].length
const Name=props.value[0][0].Name


//filterdata()
const localCache =()=>{
    let list= localStorage.getItem('lists')
    if(list )
    {
        return JSON.parse(localStorage.getItem('lists'))
    }
    else{return []}
 }


 const list=(localCache())


 function Addsongtolist(title){
 
    
   setSonglist([...songlist,{ title:title,
        Name:option1}])

        alert("Songs Added")
}



function Addsong(){
  
    fetch('https://jsonplaceholder.typicode.com/albums').then((response)=>response.json()).then((data)=>{
        setSong(data)
    })
}

useEffect(()=>{
    localStorage.setItem('songlist',JSON.stringify(songlist))
   

   },[songlist])

    return (
        <>
      
      <button  onClick={Addsong} className="button1">Add Song</button>
        <div>
            {
            !num &&  <>
                  <div>
        <h1 className="title">{Name}</h1>
        <span>No songs added </span>
        </div>

                </>}
        <div className="add">
          {
              song  && song.map((item)=>{
                  return (<>
                        <div className="content1">
                    <h1 className="h1"><span className="span"> Title:</span> {item.title} <span className="play"><button onClick={()=>{Addsongtolist(item.title)}} >Add</button> 
                    <select onChange={(e)=>{setOption(e.target.value)}}>
                    <option >select</option>
                    {list.map((list)=>{ 
                        return(<>
                            
                             <option >{list.Name}</option>
                              </>)
                              })
                           }
                       </select>
                      </span></h1>
                    </div> </>)
              })
          }
           
        </div>
          
        </div>
        </>
    )
}

export default Playlistdetails
