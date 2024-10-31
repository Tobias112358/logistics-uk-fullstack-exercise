import logo from '/assets/logo.png'
import { useState } from 'react'

export const Header = () => {
    return(
        <>
        <div className="header">
            <img className="logo" src={logo} alt="logo" />
        </div>
        </>
    )
}