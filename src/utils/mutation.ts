import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface User {
  id?: string;
  name: string;
  email: string;
  age: number;
}

const usersCollection = collection(db, "users");


export const createUser = async (user: Omit<User, "id">): Promise<void> => {
  try {
    await addDoc(usersCollection, user);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};


export const fetchUsers = async (): Promise<User[]> => {
  try {
    const data = await getDocs(usersCollection);
    return data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as User),
    }));
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
};


export const updateUser = async (
  id: string,
  updatedData: Omit<User, "id">
): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", id), updatedData);
  } catch (error) {
    console.error("Error updating user: ", error);
  }
};


export const deleteUser = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (error) {
    console.error("Error deleting user: ", error);
  }
};
