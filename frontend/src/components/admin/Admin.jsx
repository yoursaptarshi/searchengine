import "./admin.css"
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux"
import { getallusers } from "../../Actions/user"
import { useState } from "react"

import {crawl} from "../../Actions/search"

const Admin = () => {
  const dispatch = useDispatch();
  useEffect( ()=>{
     dispatch(getallusers());
  },[dispatch])
const GetAllUserHandler = ()=>{
   let visibility = document.querySelector(".admin_view_users").style.display;
   if(visibility == "block" ){
    document.querySelector(".admin_view_users").style.display="none"
   }
   else{
    document.querySelector(".admin_view_users").style.display="block";
    document.querySelector(".admin_view_crawler").style.display="none";
   }
}
const data = useSelector((state)=>state.user);

const response = useSelector((state)=>state.search.response)

const [URL,setURL]=useState('');
const urlSubmitHandler = (e)=>{
  
  dispatch(crawl(URL));
  if(response==true){
    alert("crawl success");
  }
  else if(response==null){
    alert("crawl error")
  }
  else{
    alert("Url Exists in Database")
  }
}

const GetCrawlerHandler = ()=>{
  let visibility = document.querySelector(".admin_view_crawler").style.display;
  if(visibility == "block"){
    document.querySelector(".admin_view_crawler").style.display="none";
  }
  else{
    document.querySelector(".admin_view_crawler").style.display="block";
    document.querySelector(".admin_view_users").style.display="none"
  }
}
  return (
    <div className="admin_main_container">

      <div className="admin_parent_container">
        <div className="admin_section_container">
          <div className="admin_section_users">
            <button onClick={GetAllUserHandler}>Users</button>
          </div>
          <div className="admin_section_crawl">
            <button onClick={GetCrawlerHandler}>Crawl</button>
          </div>
        </div>
        <div className="admin_view_container">
          
       <div className="admin_view_users">
       {data.users && data.users.length > 0 && (
          <table >
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>UserName</th>
              
            </tr>
                  {data.users.map((result,index)=>{
                    return <tr key={index}>
                      <td>{result.name}</td>
                      <td>{result.email}</td>
                      <td>{result.username}</td>
                      
                    </tr>
                  })}
          </table>
        )}
       </div>
       <div className="admin_view_crawler">
        <input type="text" value={URL} onChange={(e)=>{setURL(e.target.value)}}/>
        <button onClick={urlSubmitHandler}>Crawl</button>
       </div>
        </div>
      </div>
    </div>
  )
}

export default Admin