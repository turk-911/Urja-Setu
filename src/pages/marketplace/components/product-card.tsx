import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import Rating from "@/components/ui/rating";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLikedProducts } from "@/redux/authSlice";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
// import { useState } from "react";
import { addToCart } from "@/api/cart/addToCart";
import { updateProdLike } from "@/redux/productSlice";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth} = useIsAuthorized();
  console.log(product);
  // const [liked, setLiked] = useState<boolean>(product.liked);
  // console.log(liked);
  function handleShowDetails(){
    navigate(`/product/${product.id}`);
  }

  function handleAddToCart(){
    // addToCart(cartId, product.id, 1, dispatch)
  }

  function handleLike(){
    dispatch(updateProdLike({ productId:product.id, isLiked:product.liked }));
    dispatch(updateLikedProducts({ productId:product.id, isLiked:product.liked, userId:auth.uid}));
    // setLiked(liked => !liked);
  }

  return (
    <Card className="p-4 bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg flex flex-col justify-between transition-all">
      <CardContent className="p-0">
        <div
          className="relative aspect-square"
          style={{
            backgroundImage: `url('${product.images[0]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Button
            onClick={handleLike}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-100 transition-all hover:bg-white hover:text-black"
          >
            {product.liked ? (
              <Heart fill="#22c55e" className="h-5 w-5 text-green-500" />
            ) : (
              <Heart className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="px-1 py-4">
        <div className="flex items-center justify-between">
          
          <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
          <Badge variant={"outline"} className="bg-green-50"> {product.category}</Badge>
          </div>
          {/* <p className="text-xl font-bold mb-2">${product.price.toFixed(2)}</p> */}
          <div className="flex items-baseline space-x-2">
        {product.discount ? (<>
          <span className="text-xl font-bold">${(product.price - (product.price * (product.discount / 100))).toFixed(2)}</span>
        </>) : (<>
          <span className="text-xl font-bold">${product.price}</span>
        </>)}
        <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
        {product.discount && <Badge className="px-1 py-[2px] m-0" variant="success">{(product.discount).toFixed(2)}% OFF</Badge>}
      </div>
          <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {product.seller}
          </span>
            <Rating rating={product.rating} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-between items-center flex-wrap gap-2">
        <Button onClick={handleShowDetails} variant={"outline"} className="border-none text-gray-800 hover:bg-gray-300 hover:text-gray-800"> Show Details </Button>
        <Button onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
