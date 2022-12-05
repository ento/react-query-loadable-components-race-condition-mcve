import React, { useEffect } from "react";

import { useProjects } from "../queries";

export default function Projects() {
  console.log(new Date().getTime(), "Rendering Projects");
  const { data } = useProjects();
  return <>projects: {JSON.stringify(data)}</>;
}
