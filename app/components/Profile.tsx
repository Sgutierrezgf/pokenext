import { useSession } from "next-auth/react";
import React from "react";
import { userImage } from "../constants";
import Image from "next/image";

interface ProfileProps {
  selectedUser: any; // Reemplaza 'any' con el tipo adecuado para la propiedad selectedUser
}

const Profile: React.FC<ProfileProps> = ({ selectedUser }) => {
  const { data } = useSession();
  return (
    <article className="flex m-5 place-self-center gap-12">
      <Image
        className="h-40 w-40 rounded-full"
        src={data?.user?.image || userImage}
        alt={`${data?.user?.name}`}
        width={200}
        height={200}
      />
      <div className=" self-center text-center">
        <div className="grid">
          <span className="font-extrabold py-2 text-gray-800 text-sm">
            Name
          </span>
          <div className="text-center text-sm font-semibold text-gray-700 py-1.5">
            {data?.user?.name}
          </div>
        </div>
        <div>
          <span className="font-extrabold py-2 text-gray-800 text-sm">
            Email
          </span>
          <div className="text-center text-sm font-semibold text-gray-700 capitalize py-1.5">
            {data?.user?.email}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Profile;
