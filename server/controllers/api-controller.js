export const test = (req, res) => {

    res.status(200).json({
        "outcome": true,

        mandCompanies: [
            {
                "name": "Company 1",
                "id": 1,
                "sites": [
                    {
                        "name": "Hospital",
                        "id": 1234,
                        "plottrData": [
                            {
                                "lat": 53.34819631399739,
                                "lng": -1.4875218170248719
                            },
                            {
                                "lat": 53.34884258009266,
                                "lng": -1.484346129770862
                            },
                            {
                                "lat": 53.34261647597055,
                                "lng": -1.4872692055387575
                            },
                            {
                                "lat": 53.345358707241274,
                                "lng": -1.4906484603312755
                            }
                        ],
                        "terminals": [
                            {
                                "name": "Terminal 1",
                                "id": 12345,
                                "plottrData": {
                                    "lat": 53.34819631399739,
                                    "lng": -1.4875218170248719
                                },
                                "type": {
                                    "rfid": true,
                                    "screen": true,
                                    "ghost": false
                                }

                            },
                            {
                                "name": "Terminal 2",
                                "id": 12346,
                                "plottrData": {
                                    "lat": 53.34884258009266,
                                    "lng": -1.484346129770862
                                },
                                "type": {
                                    "rfid": true,
                                    "screen": true,
                                    "ghost": false
                                }
                            }
                        ]
                    },
                    {
                        "name": "Factory",
                        "id": 2345,
                        "plottrData": [
                            {
                                "lat": 53.341216015889806,
                                "lng": -1.4930792697193893
                            },
                            {
                                "lat": 53.340677365150114,
                                "lng": -1.4813508792926477
                            },
                            {
                                "lat": 53.33828567368466,
                                "lng": -1.4855730998542154
                            }
                        ],
                        "terminals": [
                            {
                                "name": "Terminal 3",
                                "id": 12347,
                                "plottrData": {
                                    "lat": 53.341216015889806,
                                    "lng": -1.4930792697193893
                                },
                                "type": {
                                    "rfid": true,
                                    "screen": true,
                                    "ghost": false
                                }
                            },
                            {
                                "name": "Terminal 4",
                                "id": 12348,
                                "plottrData": {
                                    "lat": 53.340677365150114,
                                    "lng": -1.4813508792926477
                                },
                                "type": {
                                    "rfid": true,
                                    "screen": true,
                                    "ghost": false
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Company 2",
                "id": 2,
                "sites": [
                    {
                        "name": "Warehouse",
                        "id": 3456,
                        "plottrData": null
                    }
                ],
                "terminals": [
                    {
                        "name": "Terminal 5",
                        "id": 12349,
                        "plottrData": null,
                        "type": {
                            "rfid": true,
                            "screen": true,
                            "ghost": false
                        }
                    },
                    {
                        "name": "Terminal 6",
                        "id": 12350,
                        "plottrData": null,
                        "type": {
                            "rfid": true,
                            "screen": true,
                            "ghost": false
                        }
                    }
                ]
            }
        ]
    });
};