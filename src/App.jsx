import loading  from "./assets/loding.gif"
import { createBrowserRouter, RouterProvider } from "react-router";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import { movieDetailsLoader } from "./Loader/movieDetailsLoader";
import { searchPageLoader } from "./Loader/searchPageLoader";
import Layout from "./component/Layout";
import SearchPage from "./component/SearchPage";


function App() {

  const routes= [
  {
    path: '/',
    element: <Layout />,
    loader: searchPageLoader,
    hydrateFallbackElement:<div className="flex h-screen justify-center items-center"><img src={loading} alt="Loading…" className="mx-auto my-10" /></div> ,
    children: [
      {
        index: true,
        element: <SearchPage/>,
        loader: searchPageLoader,
        hydrateFallbackElement:<div className="flex h-screen justify-center items-center"><img src={loading} alt="Loading…" className="mx-auto my-10" /></div> ,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailsPage />,
        loader: movieDetailsLoader,
        errorElement: <p className="p-4 text-red-500">Movie not found or failed to load.</p>,
        hydrateFallbackElement:  <div className="flex h-screen justify-center items-center"><img src={loading} alt="Loading…" className="mx-auto my-10" /></div> ,
      },
      
    ],
  },
];
 const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});
  return (
    <>
       <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
       
    </>
  )
}

export default App