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

async function getPages() {
  const { payload }: { payload: MenuItem[] } = await (
    await fetch(`${process.env.API_URL}/api/page`)
  ).json();
  return payload;
}