import React from 'react'
import './loader.css'

const Loader = props => {

    return(
        <div className="center">
            <div className="lds-ripple">
                <div/>
                <div/>
            </div>
        </div>
    )
}

export default Loader