"use client";

import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "./product-grid";
import ProductFilters from "./product-filters";
import { fetchProducts } from "@/api/products/fetchProducts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";

const categories = ["All", "Furniture", "Electronics", "Clothing"];

export default function ProductShowcase() {
  const { category = "All", page = "1" } = useParams();
  const {auth} = useIsAuthorized();
  const dispatch = useDispatch();
  const products = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = React.useState([0, 1000])
  const handleCategoryChange = (newCategory: string) => {
    navigate(`/marketplace/category/${newCategory}/page/1`);
  };

  React.useEffect(() => {
    if(auth.uid){
      console.log(auth.uid);
      fetchProducts(auth.uid, dispatch);
    }
  }, [auth])

  return (
    <div className="container w-[90%] mx-[5%] pt-12">
      <h2 className="text-3xl font-bold mb-6">Recycled Treasures</h2>
      <Tabs
        value={category}
        className="w-full"
        onValueChange={handleCategoryChange}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <div>
              {categories.map((cat) => (
                <TabsTrigger className="bg-white text-gray-800" key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </div>
            <div>
              <ProductFilters priceRange={priceRange} setPriceRange={setPriceRange}/>
            </div>
          </TabsList>
        </div>
        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            {products && <ProductGrid products={products.product} category={cat} currentPage={parseInt(page)} priceRange={priceRange} setPriceRange={setPriceRange} /> }
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
