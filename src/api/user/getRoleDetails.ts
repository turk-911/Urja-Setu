import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { updateDetails } from "@/redux/authSlice";


export const getRoleDetails = async (id: string, dispatch: any) => {
    try {
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);
        const userData : DocumentData | undefined = userDoc.data();
        if(userDoc.exists() && userData){
            const role = userData.role;
            let updates = {};
            console.log(role);
            
            if(role == "DeliveryPerson"){
                updates = {
                    organizationId: userData.organisationId,
                    rating: userData.rating,
                    assignedWork: userData.assignedWork,
                    address: userData.address,
                    phone: userData.phone,
                    code: userData.code
                }   
            }
            else if(role == "Organization"){
                updates = {
                    events: userData.events,
                    followers: userData.followers,
                    address: userData.address,
                    phone: userData.phone
                }
            }
            else{
                updates = {
                    eventsId: userData.eventsId,
                    following: userData.following,
                    orders: userData.orders,
                    address: userData.address,
                    wallet: userData.wallet,
                    liked: userData.liked,
                    phone: userData.phone
                }
            }
            // console.log(userData);
            // console.log("Updates being dispatched:", updates);
            dispatch(updateDetails({updates}));
            // console.log("Updates  dispatched:", updates);
            return;
        }
    }
    catch(error : any){
        console.log("Error At getRoleDetails ", error);
        return;
    }
}