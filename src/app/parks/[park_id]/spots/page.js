import InteractiveSpotPicker from "./interactiveSpotPicker";

export default async function Page({params}) {
    const {park_id}= params;

    const parkInfo = await fetch(`http://localhost:5000/parking_lot/${park_id}`, {
        method: "GET",
        cache:"no-store",
    }).then((res) => res.json());

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 w-full">
            <h1 className="text-5xl font-bold text-[#FFAC75] mb-6">Spots for park {park_id}</h1>
            <InteractiveSpotPicker imageUrl={"http://localhost:5000"+parkInfo.image_url} park_id={park_id} />
        </div>
    )
}