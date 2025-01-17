"use server";

import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

async function uploadFileS3(fileBuffer,fileName) {
    let fileNameS3 = `${fileName.split(".")[0]}-${Date.now()}`
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileNameS3,
        Body: fileBuffer,
        ContentType: "image/png",
        ACL: "public-read"
    })
    const response = await s3.send(command);
    return fileNameS3
}

export async function actionPost(data) {
    let fileName = "";
    try {
        const file = data.get("file")
        console.log(file)
            
        const buffer = Buffer.from(await file.arrayBuffer())
        fileName = await uploadFileS3(buffer,file.name)
            
    } catch (error) {
        console.log(error)
    }
        
    const body = {
        name: data.get("name"),
        picture: fileName,
        rtsp_url: data.get("urlStream"),
        latitude: data.get("latitude"),
        longitude: data.get("longitude"),
    }
    
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
        revalidatePath("/parks");
        redirect("/parks");
}