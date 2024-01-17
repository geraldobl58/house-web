import { Property } from "@prisma/client";

interface PropertyContactProps {
  property: Property;
}

export const PropertyContact = ({ property }: PropertyContactProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h3 className="text-muted-foreground">Informações</h3>
      <div className="mt-8 mb-8 space-y-4 flex flex-col items-center justify-center">
        {/* <Image
          width={100}
          height={100}
          alt={`${user?.fullName}`}
          src={user?.imageUrl || ""}
          className="rounded-lg"
        /> */}
        <p>{property.userName}</p>
        {/* <p>{user?.primaryEmailAddress?.emailAddress}</p> */}
      </div>
    </div>
  );
};
