"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import ReviewModal from "../modals/ReviewModal"
import { IProduct } from "@/database/models/product.model"

const Reviews = ({ product, userId }: { product: IProduct, userId:string }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-2xl font-bold text-black">
          {product.numReviews} Reviews
        </h2>
        <Button
          onClick={() => setOpen(true)}
          type="button"
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-light_blue transition duration-200"
        >
          Add a Review
        </Button>
      </div>

      {/* Reviews List */}
    {/* Reviews List */}
{Array.isArray(product.reviews) && product.reviews.some((r) => r.isVerified) ? (
  <div className="flex flex-col gap-6">
    {product.reviews
      .filter((review) => review.isVerified)
      .map((review) => (
        <div
          key={review._id || `${review.name}-${review.title}`}
          className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4"
        >
          {/* Reviewer Info */}
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={"https://m.media-amazon.com/images/S/amazon-avatars-global/4b0118d6-d558-49fd-bc21-ddc5453e40f8._CR0%2C0%2C500%2C500_SX460_.jpg"}
              alt={review.name || "Reviewer"}
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {review.name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-400">
                Reviewed on{" "}
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : "an unknown date"}
              </p>
            </div>
          </div>

          {/* Rating + Verified */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: review.rating || 0 }, (_, i) => (
                <img
                  key={i}
                  src="/star.png"
                  alt="star"
                  className="w-5 h-5 object-contain"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-yellow-600 hover:underline cursor-pointer">
              Verified Purchase
            </span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-black">
            {review.title || "No Title"}
          </h4>

          {/* Comment */}
          <p className="text-[15px] text-gray-700 leading-relaxed">
            {review.comment || "No comment provided."}
          </p>
        </div>
      ))}
  </div>
) : (
  <p className="text-gray-500 text-sm">No reviews yet. Be the first to leave one!</p>
)}


      {/* Modal */}
      <ReviewModal userId={userId} open={open} setOpen={setOpen} product={product} />
    </div>
  )
}

export default Reviews
