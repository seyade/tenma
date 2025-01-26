"use server";

export async function handleSubmit<T>(formData: T) {
  await console.log("FORM_DATA:", formData);
}
