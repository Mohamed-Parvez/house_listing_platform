import Link from "next/link";
interface HouseProps {
  _id: string;
  houseName: string;
  housePrice: number;
}

async function Home() {
  const fetchdata = await fetch("http://localhost:8080/api", {
    cache: "no-store",
  });
  const getdata: HouseProps[] = await fetchdata.json();
  return (
    <main className="flex flex-col items-start justify-start max-w-screen-xl w-full">
      <div className="max-w-screen-xl w-full p-4 flex items-center justify-between">
        <p className="text-[20px] font-medium">Welcome to house property</p>
        <Link
          className="bg-black ring-1 ring-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-[10px]"
          href={"/housepost"}
        >
          Post House
        </Link>
      </div>

      <div className="flex flex-col items-start space-y-6 justify-start m-4">
        {getdata.map((items: any) => (
          <div
            key={items._id}
            className="flex items-center ring-1 rounded-[6px] ring-black p-4 justify-center gap-4"
          >
            <div className="flex flex-col items-start rounded-[6px] ring-1 ring-black p-4 justify-start space-y-3">
              <p>House Id: {items._id}</p>
              <p>House Name: {items.houseName}</p>
              <p>House Price: {items.housePrice}</p>
            </div>
            <div className="flex flex-col space-y-8 items-center justify-center">
              <Link
                href={{
                  pathname: "/houseupdate",
                  query: {
                    search: items._id,
                  },
                }}
              >
                <button className="bg-black ring-1 ring-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-full">
                  Update
                </button>
              </Link>

              <Link
                className="bg-black text-white ring-1 ring-black hover:bg-white hover:text-black px-4 py-2 rounded-full"
                href={{
                  pathname: "/deletehouse",
                  query: {
                    search: items._id,
                  },
                }}
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
