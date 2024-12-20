import NavBar from "@/components/nav-bar";
import ProductShowcase from "./components/product-showcase";
import Footer from "@/components/ui/Footer";
export default function Home() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <ProductShowcase />
      <Footer />
    </div>
  );
}
