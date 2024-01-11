import prismadb from "@/lib/prismadb";
import { PropertiesClient } from "./components/client";

interface PropertiesPageProps {
  params: {
    propertiesId: string;
  };
}

const PropertiesIdPage = async ({ params }: PropertiesPageProps) => {
  const properties = await prismadb.property.findUnique({
    where: {
      id: params.propertiesId,
    },
  });

  console.log(properties);

  return (
    <>
      <div>PropertiesPage</div>
      {/* <PropertiesClient properties={properties} /> */}
    </>
  );
};

export default PropertiesIdPage;
