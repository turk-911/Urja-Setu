import { useEffect, useState } from "react";
import { getDetails } from "@/api/auth/getDetails";
import { useDispatch } from "react-redux";
import { useAppSelector } from '@/redux/hooks';

const Role = () => {
    const dispatch = useDispatch();
    const [selectedRole, setRole] = useState("Select")
    const auth = useAppSelector((state) => state.auth);
    const [id, setId] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(id);
        getDetails(selectedRole, id, dispatch);
        console.log("Done");
    }
    useEffect(() => {
      if(auth){
        console.log(auth);
      }
    }, [auth])



  return (
    <div className="role-selection-container">
      <h2>Choose Your Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)}/>
          <label htmlFor="role">Select Role: </label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => {
              setRole(e.target.value);
              console.log(selectedRole);
              
            }}
            required
          >
            <option value="">Select a role</option>
            <option value="User">User</option>
            <option value="Organization">Organization</option>
            <option value="DeliveryPerson">Delivery Person</option>
          </select>
        </div>

        <div>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Role;
