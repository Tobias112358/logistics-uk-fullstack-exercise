import menu from '../../data/menu.json'
import { MenuItem, SidebarProps } from './Sidebar.types'


export const Sidebar = (props: SidebarProps) => {

    const clickHandler = (url: string) => {
        
        window.location.href = props.urlBasePath + url
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