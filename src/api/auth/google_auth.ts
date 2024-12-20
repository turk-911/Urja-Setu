import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { db } from "../../utils/firebase";
import { doc, setDoc, getDoc, DocumentData } from "firebase/firestore";
import { setAuthData } from "@/redux/authSlice";
import { saveDeliveryPerson } from "./saveDelivery";
import { saveOrganization } from "./saveOrganization";
import { saveUser } from "./saveUser";
import { getRoleDetails } from "../user/getRoleDetails";

const saveDummyUser = async (user: { uid: string; name: string | null; email: string | null; photoURL: string | null; role: string | null}) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if(!userDoc.exists()){
      const newUser = {
        name: user.name || "New User",
        email: user.email || "example@example.com",
        photoURL: user.photoURL || null,
        role: user.role
      };

      await setDoc(userRef, newUser);
      if(user.role == "DeliveryPerson"){
        await saveDeliveryPerson(user.uid);
      }
      else if(user.role == "Organization"){
        await saveOrganization(user.uid);
      }
      else{
        await saveUser(user.uid);
      }
      // console.log("User saved successfully:", user.uid);
    }
    else{

      console.log("User already exists:", user.uid);
    }
  }
  catch(error: any){
    console.error("Error saving user:", error.message);
  }
};

const handleGoogleSignIn = async (dispatch: any, role: string | null) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // console.log("User Info:", {
    //   uid: user.uid,
    //   name: user.displayName,
    //   email: user.email,
    //   photoURL: user.photoURL,
    // });
    if(role == null){
      role = "User";
    }
    if(role){
      await saveDummyUser({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: role
      });
    }
    else{
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const userData : DocumentData | undefined = userDoc.data();
        if(userData) role = userData.role;
    }
    
    dispatch(setAuthData({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role: role
    }))
    await getRoleDetails(user.uid, dispatch);
    return;

  } catch (error: any) {
    console.error("Error during Google sign-in:", error.message);
  }
};

export default handleGoogleSignIn;
