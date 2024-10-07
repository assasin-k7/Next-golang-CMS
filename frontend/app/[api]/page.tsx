import ItemCard from "@/components/ui/ItemCard"
import { Item,MenuItem } from "@/types/types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { pageSlug: string };
}): Promise<Metadata> {
  const pages = await getPages();
  return {
    title: pages.find((page: MenuItem) => page.slug === params.pageSlug)?.text,
    description: "Descripition for the page",
  }
}

export default async function brand({ params}: {
  params: { pageSlug: string }
}) {
  const items = await getItems({ pageSlug: params.pageSlug })
  const pageTitle = (await getPages()).find((page: MenuItem) => page.slug === params.pageSlug)?.text; // added arror
  console.log("this is ",items)
  if (!items || items.length === 0)
		return (
			<div className="min-h-screen bg-secondary pt-10">
				<section className="p-20">
					<h2 className="text-4xl mb-5 font-bold">{pageTitle}</h2>
					<p className="text-xl">Nothing to see yet!</p>
				</section>
			</div>
		);

	return (
		<div className="bg-secondary pt-10">
			<section className="p-20">
				<h2 className="text-4xl mb-5 font-bold">{pageTitle}</h2>
				<div className="flex flex-wrap">
					{items.map((item, index) => (
						<ItemCard key={index} item={item} />
					))}
				</div>
			</section>
		</div>
	);

}
type GetItemsResponse = {
	errorMessage: string;
	hasError: boolean;
	metadata: null | {
		[key: string]: any;
	};
	payload: null | Item[];
};
async function getItems({ pageSlug }: { pageSlug: string }) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/brand/${pageSlug}`,
      {
        next: {
          revalidate: 0
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch data")
    const data: GetItemsResponse = await res.json();
    if (data.hasError) throw new Error(data.errorMessage);
    return data.payload
  } catch (error) {
    return null;
  }
}
async function getPages() {
  const { payload }: { payload: MenuItem[] } = await (
    await fetch(`${process.env.API_URL}/api/page`)
  ).json();
  return payload;
}