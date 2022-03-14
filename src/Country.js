import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import NumberFormat from "react-number-format";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
 


export default function Country(props) {
    const [countryData, setCountryData] = useState({});
    
    let name = props.name.toLowerCase();
    let url = `https://restcountries.com/v3.1/alpha/${name}`;

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
   

    useEffect(() => {
     const fetchCountryData = async () => {
       try {
         await axios
           .get(url)
           .then((result) => setCountryData(result.data));
       } catch (e) {
         console.log(e.message);
       }
     };
     fetchCountryData();
   }, []);
 
   console.log(countryData);


    return(
        <>
        <div ref={ref}>
      <Button className="btn" onClick={handleClick}>Some facts about...</Button>

      <Overlay
        show={show}
        target={target}
        placement="right"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">{countryData[0] && countryData[0].name.common}</Popover.Header>
          <Popover.Body>
            
            {countryData[0] && <>
            <p>Continent: {countryData[0].continents}</p>
            <p>Capital: {countryData[0].capital}</p>
            <p>Population: <NumberFormat value={countryData[0].population} displayType={"text"} thousandSeparator={true} /></p>
        

        </>}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
        
    </>
    )
}