"use client"
import React, {useState} from 'react'
import { Button } from '../ui/button'

import AlertMessage from './AlertMessage'
import ReviewModal from '../modals/ReviewModal'
import { IProduct } from '@/database/models/product.model'

const Reviews = ({product}: {
   product: IProduct
}) => {
   const [open,setOpen] = useState<boolean>(false)
  return (
    <div className='py-10 bg-white px-4 lg:max-w-[900px]  '>
      <div className='flex flex-col-reverse mb-5 justify-between sm:items-center sm:flex-row items-start'>
         <h3 className='text-2xl max-sm:text-[17px] text-black font-medium '>{product.numReviews} Reviews</h3>
         <div className='max-sm:w-full justify-end flex '>
          <Button
           onClick={() => setOpen(true)}
           type='button'
           className="text-white bg-secondary rounded-xl hover:bg-light_blue  ">
             Add a Review
          </Button>
            
         </div>
         
      </div>
      <div className='flex flex-col space-y-8 mx-4'>
              {product.reviews.map((review,index)=> (
                  <div className='flex flex-col gap-2' key={index}>
                      <div className='flex items-center gap-2.5'>
                          <img className="w-[30px] h-[30px] object-contain rounded-full " src="https://m.media-amazon.com/images/S/amazon-avatars-global/4b0118d6-d558-49fd-bc21-ddc5453e40f8._CR0%2C0%2C500%2C500_SX460_.jpg" alt="" />
                          <span>
                             {review.name}
                          </span>
                      </div>
                      <div className='flex sm:flex-row flex-col justify-start sm:items-center gap-3'>
                         <div className='flex items-center gap-1'>
                         {Array.from({ length: review.rating }, (_, index) => (
                            <img src="/star.png" className="w-[20px] object-contain " key={index} />
                         ))}
                         </div>
                          <p className='font-bold text-black hover:underline hover:to-blue-950 text-[18px] max-sm:text-[16px] '> 
                            {review.title}
                          </p>
                      </div>
                      <div>
                         <p className='text-sm text-gray-500 font-normal leading-[1.7] '>Reviewed on March 9, 2025</p>
                         <span className='text-yellow-500 text-sm font-medium leading-[1.7] hover:underline '>Verified Purchase</span>
                      </div>
                      <p className='font-medium text-black  text-[16px] max-sm:text-[14px] '>
                         {review.comment}
                      </p>
                  </div>
              ) )}
          </div>
     <ReviewModal open={open} setOpen={setOpen} product={product} />
    </div>
  )
}

export default Reviews