import React, {useReducer, useEffect} from "react";
// import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import loadableComponent from "@loadable/component";

import { useProjects } from "./queries";

function withForcedRerendering(WrappedComponent) {
  const Wrapper = (props) => {
    // Most efficient way to force a re-render
    // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    useEffect(() => {
      setTimeout(() => {
        console.warn("Force update");
        forceUpdate();
      }, 0);
    }, []);

    return <WrappedComponent {...props}></WrappedComponent>;
  };
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  Wrapper.displayName = `withLazyLoadedReactivityEnsurer(${wrappedComponentName})`;
  return Wrapper;
}

const Navbar = () => {
  console.log(new Date().getTime(), "Rendering Navbar");
  const { data } = useProjects();
  return <div>Non-loadable projects: {JSON.stringify(data)}</div>;
};

const LoadableProjects = loadableComponent(async () => {
  const mod = await import(/* webpackChunkName: "projects" */ "./components/Projects")
  return withForcedRerendering(mod.default);
  // return mod;
});

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
      Loadable: <LoadableProjects />
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
