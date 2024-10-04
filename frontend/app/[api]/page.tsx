import { MenuItem } from "@/types/types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { pageSlug: string };
}): Promise<Metadata> {
  const pages = await getPages();
  return {
    title: pages.find((page: MenuItem) => page.slug === params.pageSlug)?.text,
  }
}

async function getItems({ pageSlug }: { pageSlug: string }) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/brand/${pageSlug}`,
      {
        next:{
          revalidate: 0
        },
      }
    );
  if(!res.ok) throw new Error("Failed to fetch data")

  } catch (error) {

  }
}
async function getPages() {
  const { payload }: { payload: MenuItem[] } = await (
    await fetch(`${process.env.API_URL}/api/page`)
  ).json();
  return payload;
}