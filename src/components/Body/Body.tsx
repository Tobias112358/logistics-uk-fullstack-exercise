import { useEffect, useState } from 'react'
import { DriverComponentProps, DriverItem, Trace, Activity } from './Body.types'
import drivers from '../../data/drivers.json'

const DriverComponent = (props: DriverComponentProps) => {
    const [totalDuration, setTotalDuration] = useState<number>(0)
    const [daysActive, setDaysActive] = useState<boolean[]>([false, false, false, false, false, false, false])
    const today = new Date("2021-02-07")
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    useEffect(() => {
        let duration:number = 0
        let datesActive:string[] = []
        props.driverItem.traces.forEach((trace: Trace) => {
            datesActive.push(trace.date)
            trace.activity.forEach((activity: Activity) => {
                duration = duration + activity.duration
            });
        });
        setTotalDuration(duration)

        //setDaysActive()
        let daysActiveArray: boolean[] = daysActive
        datesActive.forEach((dateString: string) => {
            let currentDate = new Date(dateString);
            const differenceInMilliseconds = currentDate.getTime() - today.getTime();
            const differenceInDays = Math.abs(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            daysActiveArray[6 - differenceInDays] = true;
        })
        setDaysActive(daysActiveArray)
    }, []);

    return (
        <tr className={"driver " + (props.index % 2 == 0 ? 'driver-even' : 'driver-odd')} >
            <td className="driverName">
                <span>{props.driverItem.forename} {props.driverItem.surname}</span>
            </td>
            <td className="vehicleRegistration">
                {props.driverItem.vehicleRegistration}
            </td>
            <td className="driverDuration">
                {totalDuration} minutes
            </td>
            <td className="activityDays">
                <table>
                    <thead>
                        <tr>
                            <th>{dayNames[(today.getDay() - 6 + 7) % 7]}</th>
                            <th>{dayNames[(today.getDay() - 5 + 7) % 7]}</th>
                            <th>{dayNames[(today.getDay() - 4 + 7) % 7]}</th>
                            <th>{dayNames[(today.getDay() - 3 + 7) % 7]}</th>
                            <th>{dayNames[(today.getDay() - 2 + 7) % 7]}</th>
                            <th>{dayNames[(today.getDay() - 1 + 7) % 7]}</th>
                            <th>{dayNames[today.getDay()]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {daysActive.map((active: boolean, index: number) => (
                                <td key={index} className={"dayBox " + (active ? "active" : "inactive")}></td>
                            ))}
                            
                        {/*props.driverItem.traces.map((trace: Trace, index: number) => (
                            <td key={index}>{trace.date}</td>
                        ))*/}
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    )
}

export const Body = () => {

    return (
        <div className="body">
            <table>
                <thead>
                    <tr>
                        <th>Driver</th>
                        <th>Vehicle Registration</th>
                        <th>Duration</th>
                        <th>Activity Days</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.data.map((driver: DriverItem, index: number) =><DriverComponent key={index} index={index} driverItem={driver} />
                    )}
                </tbody>
            </table>
        </div>
    )
}