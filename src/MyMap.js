import React, { useState} from 'react'
import { Map, Marker } from 'pigeon-maps'

export default function MyMap(props) {
    console.log(props);
    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 80% 40%)`

  return (
    <Map height={300} width={550} defaultCenter={[props.lat, props.lng]} defaultZoom={11}>
      <Marker 
        width={50}
        anchor={[props.lat, props.lng]} 
        color={color} 
        onClick={() => setHue(hue + 50)} 
      />
    </Map>
  )
}

