import { ResponseUser } from "../interface";
import { Link } from "react-router-dom";

type UserCardProps = {
  user: ResponseUser;
};

const UserCard = ({ user }: UserCardProps) => {
  const { id, email, username, name, address, phone } = user;
  const { firstname, lastname } = name;
  const { city, street, number, zipcode } = address;
  return (
    <li className="admin-users-item container-space-between m-5">
      <div>
        <h5>Base Info : </h5>
        <p>id : {id}</p>
        <p>username : {username}</p>
        <p>email : {email}</p>
        <p>phone : {phone}</p>
      </div>
      <div>
        <h5>Name : </h5>
        <p>firstname : {firstname}</p>
        <p>lastname : {lastname}</p>
      </div>
      <div>
        <h5>Address : </h5>
        <p>city : {city}</p>
        <p>
          street : {street}, {number}
        </p>
        <p>zipcode : {zipcode}</p>
      </div>
      <div className="container-center">
        <Link className="btn-secondary my-10" to={`/admin/${id}`}>
          View Cart
        </Link>
      </div>
    </li>
  );
};

export default UserCard;
