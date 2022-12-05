import React, { useEffect } from "react";

import { useProjects } from "../queries";

const delayPerHookMsec = 20;

function block(minWaitMillisecs) {
  const start = new Date().getTime();
  while (true) {
    const now = new Date().getTime();
    if (now - start > minWaitMillisecs) break;
  }
}

function useProjectsNestedNestedNested() {
  const { data } = useProjects();
  useEffect(() => {
    block(delayPerHookMsec);
    console.log(
      new Date().getTime(),
      "useProjectsNestedNestedNested",
      "useEffect callback",
      data
    );
  }, [data]);

  return { data };
}

function useProjectsNestedNested() {
  const { data } = useProjectsNestedNestedNested();
  useEffect(() => {
    block(delayPerHookMsec);
    console.log(
      new Date().getTime(),
      "useProjectsBranch",
      "useEffect callback",
      data
    );
  }, [data]);
  return { data };
}

function useProjectsNested() {
  const { data } = useProjectsNestedNested();
  useEffect(() => {
    block(delayPerHookMsec);
    console.log(
      new Date().getTime(),
      "useProjectsNested",
      "useEffect callback",
      data
    );
  }, [data]);

  return { data };
}

export default function Projects() {
  block(delayPerHookMsec);
  console.log(new Date().getTime(), "Rendering Projects");
  const { data } = useProjectsNested();
  return <>projects: {JSON.stringify(data)}</>;
}
