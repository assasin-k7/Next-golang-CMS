import Image from "next/image"
export default function Logo() {
  return (
    <div className="flex font-bold ">
      <Image src={'/images/logo.png'} alt="Logo" width={50} height={50}/>
    </div>
  )
}