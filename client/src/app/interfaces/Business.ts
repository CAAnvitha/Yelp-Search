import { GeocodeResponse } from "../services/location/location.service";
import { Review } from "./Review";

export interface Business {
    id: string,
    name: string,
    is_closed: boolean,
    price: string,
    rating: number,
    distance: number,
    image_url: string,
    photos: string[],
    url: string,
    address: string,
    phone: string,
    categories: string[],
    coordinates: GeocodeResponse,
    reviews: Review[]

    // constructor() {
    //     this.id = un
    // }
}