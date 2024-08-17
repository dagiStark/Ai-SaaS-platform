"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/userModel";
import Image from "../database/models/imageModel";
import { redirect } from "next/navigation";

const populateUser = (query: any) =>
  query.populate({
    path: "author",
    model: User,
    select: "_id firstName lastName",
  });

// ADD IMAGE2
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDB();

    const author = await User.findById(userId);
    if (!author) throw new Error("user not found");

    const newImage = await Image.create({
      ...image,
      author: author._id,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

//UPDATE IMAGE
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    await connectToDB();

    const imageToUpdate = await Image.findById(image._id);
    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId)
      throw new Error("Unauthorized or image not found");

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updateImage));
  } catch (error) {
    handleError(error);
  }
}

//DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    await connectToDB();
    await Image.findByIdAndDelete(imageId);
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}

//GET IMAGE
export async function getImageById(imageId: string) {
  try {
    await connectToDB();

    const image = populateUser(Image.findById(imageId));

    if (!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}