import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { RootState } from "../app/store";
import { getAllUser } from "../features/auth/authSlice";
import UserCard from "./UserCard";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { userList, isLoading, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else {
      dispatch(getAllUser());
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <ul className="container-column admin-users">
        {userList.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    );
  }
};
export default AdminUsers;
