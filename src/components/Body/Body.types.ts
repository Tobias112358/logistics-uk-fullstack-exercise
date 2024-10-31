export interface DriverComponentProps {
    driverItem: DriverItem
    index: number
}

export interface DriverItem {
    driverID: number,
    surname: string,
    forename: string,
    vehicleRegistration: string
    traces: Trace[]
}

export interface Trace {
    date: string,
    activity: Activity[]
}

export interface Activity {
    startTime: string,
    type: string,
    duration: number
}