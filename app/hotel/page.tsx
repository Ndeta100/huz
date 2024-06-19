'use client'
import {SignIn} from "@/components/sigin-in";
import {auth} from "@/auth";
import CreateNewHotelModal from "@/components/hotel/create-new-hotel-modal";
import React from "react";
import {currentRole} from "@/lib/auth";
import {useSession} from "next-auth/react";

export default  function Hotel() {
    const [visible, setVisible] = React.useState(true);
    const { data: session } = useSession();


    return (

            <div>
               <CreateNewHotelModal visible={visible} setVisible={setVisible}/>
            </div>

    );
}
