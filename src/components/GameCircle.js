import React from 'react'
import '../Game.css';



const GameCircle = ({ id, children,color,onCircleClicked}) => {

    const style={
        backgroundColor:color,
       
    }
    return (
        // <div onClick={onClick}>GameCircle children={children}, id={id}</div>
        <div className="gamecircle" style={style} onClick={() => onCircleClicked(id)}>
            {children}
        </div>
    )
}

export default GameCircle