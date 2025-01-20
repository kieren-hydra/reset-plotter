export type Terminal = {
    name: string,
    id: number,
    plottrData: {
        lat: number,
        lng: number
    },
    type: {
        rfid: boolean,
        screen: boolean,
        ghost: boolean
    }

}