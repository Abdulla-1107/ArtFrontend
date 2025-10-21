// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const fetchArtworks = async () => {
//   const { data } = await axios.get("http://43.205.119.240:3000/artwork");
//   console.log(data, "data");

//   return data;
// };

// export default function Artworks() {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["artworks"],
//     queryFn: fetchArtworks,
//   });
//   if (isLoading) return <p>loading artworks</p>;
//   if (isError) return <p>Error fetching artworks!</p>;

//   return (
//     <div className="grid grid-cols-3 gap-4 p-4">
//       {data.map((artwork: any) => (
//         <div key={artwork.id} className="border p-3 rounded-lg shadow-sm">
//           <img
//             src={artwork.imageUrl || artwork.image}
//             alt={artwork.title}
//             className="w-full h-48 object-cover rounded-md"
//           />
//           <h2 className="font-bold text-lg mt-2">{artwork.title}</h2>
//           <p className="text-gray-500">{artwork.description}</p>
//           <p className="mt-2 font-semibold">${artwork.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
