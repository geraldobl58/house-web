import prismadb from "@/lib/prismadb";
import { PropertiesClient } from "./components/client";

interface PropertiesPageProps {
  params: {
    propertyId: string;
  };
}

const PropertiesPage = async ({ params }: PropertiesPageProps) => {
  // const properties = await prismadb.property.findUnique({
  //   where: {
  //     id: params.propertyId,
  //   },
  // });

  return (
    <>
      <div>PropertiesPage</div>
      {/* <PropertiesClient properties={properties} /> */}
    </>
  );
};

export default PropertiesPage;
