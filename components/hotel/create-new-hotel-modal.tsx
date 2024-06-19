import { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,Textarea, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";

interface CreateNewHotelProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function CreateNewHotelModal({ visible, setVisible }: CreateNewHotelProps) {
    const { data: session } = useSession();
    const [hotelId, setHotelId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [amenties, setAmenties] = useState<string[]>([""]);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const body = new FormData();
        body.append("name", name);
        body.append("location", location);
        body.append("description", description)
        body.append("amenities",JSON.stringify(amenties))
        const token=session?.user.accessToken
        if(!token){
            console.error("Token is missing");
            return;
        }

        const response = await fetch("http://localhost:5000/api/v1/hotel", {
            headers: {
                "X-Api-Token":token
            },
            method: "POST",
            body: body
        });

        if (response.ok) {
            closeModal();
        } else {
            console.log("Error adding hotel", response.status, response.statusText);
            const errorText = await response.text();
            console.log("Error details:", errorText)
            console.log("Error adding hotel", response.status);
        }
    }

    function closeModal() {
        resetModal();
    }

    function resetModal() {
        setName("");
        setLocation("");
        setDescription("");
        setAmenties([""])
        setErrorMessage(null)
        setVisible(false);
        setIsEditMode(false);
    }
    const handleAmenityChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmenities = [...amenties];
        newAmenities[index] = event.target.value;
        setAmenties(newAmenities);
    };

    const addAmenity = () => {
        if (amenties.length<4){
            setAmenties([...amenties, ""]);
            setErrorMessage(null)
        }else {
            setErrorMessage("You can add up to 4 amenities only.");
        }

    };
    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create a Hotel</ModalHeader>
                            <ModalBody >
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <Input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name ?? ""}
                                        required
                                        label="Name"
                                        aria-label="Name"
                                        className="w-full"
                                    />

                                    <Input
                                        onChange={(e) => setLocation(e.target.value)}
                                        value={location ?? ""}
                                        required
                                        label="Location"
                                        aria-label="Location"
                                        className="w-full"
                                    />
                                    <Textarea
                                        onChange={(e)=>setDescription(e.target.value)}
                                        value={description ?? ""}
                                        label="Description"
                                        placeholder="Enter your description"
                                        className="w-full"
                                    />
                                    {amenties.map((amenity, index)=>(
                                        <Input
                                            onChange={(e) => handleAmenityChange(index, e)}
                                            key={index}
                                            value={amenity ?? ""}
                                            required
                                            label={`Amenity ${index+1}`}
                                            aria-label={`Amenity ${index+1}`}
                                            className="w-full"
                                        />
                                    ))}
                                    <Button
                                        type="button" color={'primary'}className="w-full"
                                        disabled={amenties.length>=5}
                                        onPress={addAmenity}>
                                        Add Amenity</Button>
                                    {errorMessage && (
                                        <div style={{ color: "red" }}>{errorMessage}</div>
                                    )}
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" type="submit">
                                            Create
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
