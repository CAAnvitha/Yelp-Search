import got from 'got';

const GOOGLE_MAPS_ENDPOINT = 'https://maps.googleapis.com/maps/api';

const options = {
	prefixUrl: GOOGLE_MAPS_ENDPOINT,
    responseType: 'json'
};

const client = got.extend(options);

export const geocodeAddress = async (req, res) => {
    const address = req.query.address
    try {
		const response = await client
			.get(`geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`, options)
			.json();

        let data = null;
        if (response && response.results && response.results.length > 0 ) {
            var latitude = response.results[0].geometry.location.lat;
            var longitude = response.results[0].geometry.location.lng;
            data = {latitude, longitude}
        }
		return res.status(200).json(data);
	} catch (err) {
		console.log(err);
        return res.status(500).json({message: 'Failed to fetch business details.'})
	}
}