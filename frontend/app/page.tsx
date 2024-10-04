
import { useState, useEffect } from "react";
import { BRAND_NAME } from "./config";

export default async function Home() {
  const items = await getItems();
  async function getItems() {
    try{
      const res =  await fetch(`${process.env.API_URL}/api/brand/all`, 
        {
          next:{
            revalidate: 0
          }
        }
      )
      console.log(`this is response ${res}`)
    } catch(error) {
      return error
    }
  }
  console.log(items)
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
      </section>

    </div>
  );
}

