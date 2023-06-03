
import React from 'react'
import './Card.css'

function Cards(props) {
    return (
      <div key={props.id} className='productCard'>
        <img src={props.src} style={{width: "100%" , height: "200px", backgroundSize:"contain"}} alt="image" className='locImg'></img>
        <div className='locName'>
          <h3>{props.name}</h3>
        </div>
      </div>
    );
}


export default Cards