import got from 'got';
import dotenv from 'dotenv';

dotenv.config()

const YELP_ENDPOINT = "https://api.yelp.com/v3"

const options = {
	prefixUrl: YELP_ENDPOINT,
	headers: {
		Authorization: `Bearer ${process.env.YELP_API_KEY}`,
	},
    responseType: 'json'
};

const client = got.extend(options);

export const autoCompleteKeyword = async (req, res) => {
    const keyword = req.query.text
    try {
		const response = await client
			.get(`autocomplete?text=${keyword}`, options)
			.json();
		return res.status(200).json(response);
	} catch (err) {
		console.log(err);
        return res.status(500).json({message: 'Failed to fetch business details.'})
	}
}