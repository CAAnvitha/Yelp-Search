import got from 'got';
import dotenv from 'dotenv';

dotenv.config()

const YELP_ENDPOINT = "https://api.yelp.com/v3/businesses"

const options = {
	prefixUrl: YELP_ENDPOINT,
	headers: {
		Authorization: `Bearer ${process.env.YELP_API_KEY}`,
	},
    responseType: 'json'
};

const client = got.extend(options);

export const searchBusinesses = async (req, res) => {
	// destructing request query parameters
	// const {keyword, ...rest} = req.query
	// const latitude = rest.latitude
	// const newObj = {...rest} ; take out all the keywords from rest and assign to newObj ;  spread operator
    const {keyword, latitude, longitude, category, radius} = req.query
    try {
        const response = await client
            .get(`search?term=${keyword}&latitude=${latitude}&longitude=${longitude}&categories=${category}&radius=${radius}`, options)
            .json();

        return res.status(200).json(response['businesses']);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Failed to search businesses.'})
    }
}

export const fetchBusinessDetail = async (req, res) => {
	// const {id} =  req.params
    const id = req.params.id
    try {
		const response = await client
			.get(id, options)
			.json();

		let business = {}
		if (response) {

			business['id'] = response['id']
			business['name'] = response['name']
			business['is_closed'] = response['is_closed']
			business['phone'] = response['display_phone']
			business['price'] = response['price']
			business['url'] = response['url']
			business['photos'] = response['photos']
			business['coordinates'] = response['coordinates']

			let categories = []
			if (response['categories']) {
				response['categories'].forEach(category => categories.push(category['title']));
				business['categories'] = categories
			}
			
			if (response['location'] && response['location']['display_address']) {
				business['address'] = response['location']['display_address'].join(", ")
			}
			const reviews = await fetchBusinessReviews(id)
			business['reviews'] = reviews
		}

		return res.status(200).json(business);
	} catch (err) {
		console.log(err);
        return res.status(500).json({message: 'Failed to fetch business details.'})
	}
}

export const fetchBusinessReviews = async (id) => {
    try {
		const response = await client
			.get(`${id}/reviews`, options)
			.json();
		let reviews = []
		if (response['reviews']) {
			let length = response['reviews'].length > 3 ? 3: response['reviews'].length;
			for (let i=0; i <length; i++) {
				if (response['reviews'][i]) {
					let review = {}
					review['rating'] = response['reviews'][i]['rating']
					review['text'] = response['reviews'][i]['text']
					review['time_created'] = response['reviews'][i]['time_created']
					review['user_name'] = response['reviews'][i]['user']['name']
					reviews.push(review)
				}
			}
		}
		return reviews
	} catch (err) {
		console.log(err);
        throw err;
	}
}