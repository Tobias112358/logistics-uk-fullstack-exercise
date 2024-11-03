import menu from '../../data/menu.json'
import { Link } from 'react-router-dom'
import { MenuItem } from './Sidebar.types'


export const Sidebar = () => {

    return (
        <div className="sidebar">
            {menu.data.map((item: MenuItem, index: number) => (
                <div key={index} className="menu-item">
                    <Link to={item.url}>
                        {item.title}
                    </Link>
                </div>
                
            ))}
        </div>
    )
}