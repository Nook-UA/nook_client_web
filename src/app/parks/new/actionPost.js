"use server";

import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export async function actionPost(data) {
    console.log(data);
    const body = {
        name: data.get("name"),
        rtsp_url: data.get("urlStream"),
        latitude: data.get("latitude"),
        longitude: data.get("longitude"),
    }
    console.log(body);
    const token = await getServerSession(options).then((res) => res?.user?.idToken);
    const response = await fetch(`${process.env.BACKEND_URL}/park`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(body),
    });
    if (response.status == 200)
        redirect("/parks");
}