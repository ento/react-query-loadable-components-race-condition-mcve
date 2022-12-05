import React from "react";
// import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import loadableComponent from "@loadable/component";

import { useProjects } from "./queries";

const Navbar = () => {
  console.log(new Date().getTime(), "Rendering Navbar");
  const { data } = useProjects();
  return <div>Non-loadable projects: {JSON.stringify(data)}</div>;
};

const LazyProjects = loadableComponent(() =>
  import(/* webpackChunkName: "projects" */ "./components/Projects")
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120000,
      suspense: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
}

function Page() {
  return (
    <>
      <Navbar />
      <hr />
      Loadable: <LazyProjects />
    </>
  );
}

// React < 18
// const rootElement = document.getElementById("root");
// render(<App />, rootElement);

// React 18+
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
