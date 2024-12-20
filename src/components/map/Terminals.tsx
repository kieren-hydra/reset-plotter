import {Marker} from '@react-google-maps/api';

const Terminals = () => {


    return (
        <Marker
            position={{
            "lat": 53.34819631399739,
            "lng": -1.4875218170248719
        }}
            clickable={true}
            onClick={() => console.log("clicked")}
        />
    )
}

export default Terminals