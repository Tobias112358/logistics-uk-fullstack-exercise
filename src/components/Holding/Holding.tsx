import { HoldingProps } from "./Holding.types"

export const Holding = (props: HoldingProps) => {
    
    return (
        <div className="body">
            <div><b>The page {props.title} has not been created yet. Please check back later.</b></div>
        </div>
    )
}