import Link from "next/link";
interface HouseProps {
  _id: string;
  houseName: string;
  housePrice: number;
}
import { AuthOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UserAuthOptions from "@/components/UserAuthOptions";

async function Home() {
  const fetchdata = await fetch("http://localhost:8080/", {
    cache: "no-store",
  });
  const session = await getServerSession(AuthOptions);
  console.log(`the session da ${session}`);
  const getdata: HouseProps[] = await fetchdata.json();
  return (
    <main className="flex flex-col items-start justify-start max-w-screen-xl w-full">
      <div className="max-w-screen-xl w-full p-4 flex items-center justify-between">
        <p className="text-[20px] font-medium">Welcome to house property</p>
        <div className="flex items-center justify-center gap-6">
          {session ? (
            <UserAuthOptions />
          ) : (
            <Link
              href={"/api/auth/signin"}
              className="bg-black text-white rounded-[6px] hover:bg-white hover:text-black px-4 py-2 ring-1 ring-black"
            >
              Sign In
            </Link>
          )}
          <Link href={"/housepost"}>
            <button className="bg-black text-white rounded-[6px] hover:bg-white hover:text-black px-4 py-2 ring-1 ring-black">
              upload houses
            </button>
          </Link>
        </div>
      </div>
      {session && (
        <p className="p-4 text-[20px] font-medium text-black">
          Hi, {session.user!.name}
        </p>
      )}
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
