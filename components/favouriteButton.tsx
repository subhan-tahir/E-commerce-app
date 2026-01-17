// import React from 'react'
// import { Button } from '@/components/ui/button'
// import { Heart } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import { toggleWishlist } from '@/app/features/cartSlice'
// import { RootState } from '@/app/store'
// import { CartItem } from '@/app/types'
// import { toast } from 'react-toastify'

// interface FavouriteButtonProps {
//     product: CartItem;
// }

// const favouriteButton = ({ product }: FavouriteButtonProps) => {
//     const dispatch = useDispatch();
//     const wishlistItems = useSelector((state: RootState) => state.cart.wishlistItems) || [];
//     const isInWishlist = wishlistItems.some((item) => item.id === Number(product.id));
//     const handleToggleWishlist = () => {
//         const cartItem: CartItem = {
//             ...product,
//             id: Number(product.id),
//             quantity: 1,
//             discountPercentage: 0,
//             wishlist: isInWishlist,
//         };
//         dispatch(toggleWishlist(cartItem));
//         toast[isInWishlist ? "info" : "success"](isInWishlist ? "Removed from wishlist" : "Added to wishlist!");
//     }
//     return (
//         <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 bg-white/80 hover:bg-white shadow-sm"
//             onClick={handleToggleWishlist}
//         >
//             <Heart
//                 className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`}
//             />
//         </Button>
//     )
// }

// export default favouriteButton



const favouriteButton = () => {
  return (
    <div>
      
    </div>
  )
}

export default favouriteButton
