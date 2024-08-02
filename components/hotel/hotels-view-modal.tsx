'use client'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {Hotel, HotelApiResponse} from "@/types/hotel";
import HotelCard from "@/components/hotel/hotel-card";


const HotelsViewModal: React.FC=()=>{
    const [hotels, setHotels]=useState<Hotel[]>([])
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const fetchResponse = await fetch("http://localhost:5000/api/v1/hotel", {
                    method: "GET"
                });
                if (!fetchResponse.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                const hotelsData: HotelApiResponse = await fetchResponse.json();
                // Accessing the data array in the response
                if (hotelsData && Array.isArray(hotelsData.data)) {
                    setHotels(hotelsData.data);
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchHotels();
    }, []);
    return (
        <div>
            <h1>Hotels List</h1>
            <div className="flex flex-wrap">
                {hotels.map((hotel) => (
                    <HotelCard
                        key={hotel._id}
                        name={hotel.name}
                        location={hotel.location}
                        rooms={1}
                        amenities={hotel.amenities}
                        description={hotel.description}
                        imageUrl={hotel.images && hotel.images.length > 0 ? hotel.images[0] : ""} //TODO " "  will have default image in future
                    />
                ))}
            </div>
        </div>
    );
}

export default HotelsViewModal