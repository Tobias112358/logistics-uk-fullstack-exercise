import logo from '/assets/logo.png'

export const Header = () => {
    return(
        <>
        <div className="header">
            <img className="logo" src={logo} alt="logo" />
        </div>
        </>
    )
}