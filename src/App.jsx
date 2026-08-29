import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./Components/Pages/Layout/AppLayout";
import ErrorPage from "./Components/Pages/ErrorPage";
import Home from "./Components/Pages/Home";
import Shop from "./Components/Pages/Shop";
import ProductDetail from "./Components/Pages/Ui/Product/ProductDetail";
import Categories from "./Components/Pages/Categories";
import CategoryProduct from "./Components/Pages/CategoryProduct";
import Cart from "./Components/Pages/Cart";
import { store } from "./Components/Store/store";
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/shop/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/categories/:slug",
        element: <CategoryProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
