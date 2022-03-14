import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MyMap from './MyMap';
import Country from './Country';





export default function Location () {
   const [data, setData] = useState({});
   

   useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://geo.ipify.org/api/v2/country,city?apiKey=at_By6ESNsLq6fwZMFqqFfA8hxlfU0cu&ipAddress=")
          .then((result) => setData(result.data));
        
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  
  let url = `https://flagcdn.com/16x12/${data.ip && data.location.country.toLowerCase()}.png`;
  console.log(url);
  
  
  

    return(
      <div className='location-container'>
       {data.ip  && <>
        <h1>What's your ID?</h1>
        <h4 className="id">Your ID is: </h4>
        <p>{data.ip}</p>
        <h4>Your currently located in:</h4>
        <p><img src={url} height={25} alt="flag"></img></p>
       <p>{data.location.region},  {data.location.city}</p>
       
       <MyMap lat={data.location.lat} lng={data.location.lng}/>
       <div></div>
        <Country name={data.location.country} ip={data.ip}/>
        </>
      }
      </div>
    
    )
}