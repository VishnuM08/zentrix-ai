import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Analyze } from "./pages/Analyze";
import { Compare } from "./pages/Compare";
import { Cart } from "./pages/Cart";
import { ProductDetail } from "./pages/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/analyze",
    Component: Analyze,
  },
  {
    path: "/compare",
    Component: Compare,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/product/:id",
    Component: ProductDetail,
  },
]);
