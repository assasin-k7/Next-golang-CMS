import ItemCard from "@/components/ui/ItemCard";
import { BRAND_NAME } from "./config";
import {Item} from "@/types/types"
type GetItemsResponse = {
	errorMessage: string;
	hasError: boolean;
	metadata: null | {
		[key: string]: any;
	};
	payload: null | Item[];
};
export default async function Home() {
  const items = await getAllItems()
  async function getAllItems() {
    try{
      const res =  await fetch(`${process.env.API_URL}/api/brand/all`, 
        {
          next:{
            revalidate: 0
          }
        }
      )
      if (!res.ok) throw new Error("Failed to fetch data")
      const data: GetItemsResponse = await res.json();
      if (data.hasError) throw new Error (data.errorMessage)
        return data.payload;
    } catch(error) {
      return null
    }
  }
  return (
    <div className="bg-blue-300">
      <section className={`min-h-screen md:bg-fixed bg-scroll landscape:bg-top`}>
        <div className="bg-primary/10 pt-[25vh] min-h-screen bg-opacity-10">
          <div className="text-center">
            <h1 className="sm:text-8xl text-5xl text-white bg-primary/20 backdrop-blur-lg w-fit m-auto p-2">{BRAND_NAME}</h1>
            <a href="#nex" className="inline-block w-fit sm:text-2xl text-lg font-bold border-white border-2 text-backgrond">SHOP NOW</a>
          </div>
        </div>
      </section>

      <section className="p-20">
        <h1 className="text-4xl mb-5 font-bold sm:ml-20">NEW IN</h1>
        <div className="flex flex-wrap justify-center">
        {items?.map((item, index) => (
						<ItemCard key={index} item={item} />
					))}
        </div>
      </section>

    </div>
  );
}

