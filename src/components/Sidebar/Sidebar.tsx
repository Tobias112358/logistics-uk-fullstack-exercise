import menu from '../../data/menu.json'
import { MenuItem } from './Sidebar.types'


export const Sidebar = () => {


    const clickHandler = (url: string) => {
        console.log('clicked')
        window.location.href = url
    }

    return (
        <div>
            {menu.data.map((item: MenuItem, index: number) => (
                <div key={index} className="menu-item" onClick={() => clickHandler(item.url)}>
                    {item.title}
                </div>
            ))}
        </div>
    )
}