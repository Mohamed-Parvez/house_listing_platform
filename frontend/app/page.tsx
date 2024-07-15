import Link from "next/link";

interface HouseProps {
  _id: string;
  houseName: string;
  housePrice: number;
}

export default async function Home() {
  const fetchdata = await fetch("http://localhost:8080/", {
    cache: "no-store",
  });
  const getdata: HouseProps[] = await fetchdata.json();
  return (
    <main className="flex flex-col items-start justify-start max-w-screen-xl w-full">
      <div className="max-w-screen-xl w-full p-4 flex items-center justify-between">
        <p className="text-[20px] font-medium">Welcome to house property</p>
        <Link href={"/housepost"}>
          <button className="bg-black text-white rounded-[6px] hover:bg-white hover:text-black px-4 py-2 ring-1 ring-black">
            upload houses
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-start space-y-6 justify-start m-4">
        {getdata.map((items) => (
          <div
            key={items._id}
            className="flex flex-col items-start rounded-[6px] ring-1 ring-black p-4 justify-start space-y-3"
          >
            <p>House Id: {items._id}</p>
            <p>House Name: {items.houseName}</p>
            <p>House Price: {items.housePrice}</p>
          </div>
        ))}
      </div>
    </main>
  );
}