import { useQuery } from "@tanstack/react-query";

export function useProjects() {
  return useQuery(["projects"], fetchProjects);
}

export async function fetchProjects(key) {
  console.info(new Date().getTime(), "---> fetch projects");
  const data = [];
  await new Promise((r) => setTimeout(r, 260));
  console.info(new Date().getTime(), "<--- fetched projects", data);
  return data;
}
