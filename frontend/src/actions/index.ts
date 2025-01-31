"use server";

import { redirect } from "next/navigation";

export async function handleRegisterSubmit<T>(formData: T) {
  await console.log("FORM_DATA:", formData);
  redirect("/dashboard");
}

export async function handleSignInSubmit<T>(formData: T) {
  await console.log("FORM_DATA:", formData);
  redirect("/dashboard");
}

export async function handleSaveProject(params: any, projectData: any) {
  const userId = (await params).id;
  await console.log("PROJECT_DATA", { userId, ...projectData });
  // redirect(`/project/${project.userId}`);
}
