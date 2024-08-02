import {HotelCardProps} from "@/types/hotel";
import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";

const HotelCard: React.FC<HotelCardProps> =({name, location,description,amenities,imageUrl,rooms})=>{
    return (
        <Card className="py-4 w-full max-w-xs">
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={imageUrl}
                    width={270}
                />
            </CardBody>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{name}</h4>
                <p className="text-tiny uppercase font-bold">Location:{location}</p>
                <small className="text-default-500">Rooms: {rooms}</small>
                <p className="text-tiny">Amenities: {Array.isArray(amenities)? amenities.join(','):"No amenities available"}</p>
                <p className="text-tiny">{description}</p>
            </CardHeader>
        </Card>
    );
}

export default HotelCard