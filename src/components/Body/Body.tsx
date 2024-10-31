import { useEffect, useState } from 'react'
import { DriverComponentProps, DriverItem, Trace, Activity } from './Body.types'
import drivers from '../../data/drivers.json'

const DriverComponent = (props: DriverComponentProps) => {
    const [totalDuration, setTotalDuration] = useState<number>(0)
    const [individualActivityDuration, setIndividualActivityDuration] = useState<Map<string, number>>(new Map())
    const [daysActive, setDaysActive] = useState<boolean[]>([false, false, false, false, false, false, false])
    const today = new Date("2021-02-07")
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    useEffect(() => {
        let duration:number = 0
        let datesActive:string[] = []
        let activityDurationMap = new Map()
        props.driverItem.traces.forEach((trace: Trace) => {
            datesActive.push(trace.date)
            trace.activity.forEach((activity: Activity) => {
                duration = duration + activity.duration
                if(activityDurationMap.has(activity.type)) {
                    let currentActivityDuration = activityDurationMap.get(activity.type);
                    currentActivityDuration = (currentActivityDuration || 0) + activity.duration
                    activityDurationMap.set(activity.type, currentActivityDuration)
                } else {
                    activityDurationMap.set(activity.type, activity.duration)
                }
            });
        });

        setIndividualActivityDuration(activityDurationMap)
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
                {Array.from(individualActivityDuration.entries()).map(([key, value]: [string, number]) => 
                    <div key={key}>{key}: {value} minutes <br /></div>
                )}
                <b>{totalDuration} minutes total</b>
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
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    )
}

export const Body = () => {
    const [searchString, setSearchString] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<DriverItem[]>(drivers.data);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentSearchString = event.target.value.toLowerCase();
        setSearchString(currentSearchString);

        const filtered = currentSearchString == '' ? drivers.data : drivers.data.filter((driver: DriverItem) => {
            return driver.forename.toLowerCase().includes(currentSearchString) || driver.surname.toLowerCase().includes(currentSearchString) || driver.vehicleRegistration.toLowerCase().includes(currentSearchString);
        });

        setFilteredItems(filtered);
    };

    return (
        <div className="body">
            <input type="text" value={searchString} onChange={handleSearch} placeholder="Search by driver name or rego" />
            <br />
            <div className="drivers-table">
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
                        {filteredItems.map((driver: DriverItem, index: number) =><DriverComponent key={index} index={index} driverItem={driver} />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}