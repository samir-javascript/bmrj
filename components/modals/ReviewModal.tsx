"use client"
import { X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
 
} from "../ui/alert-dialog" 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { IProduct } from "@/database/models/product.model"
import { useState, useActionState, useEffect } from "react"
import { addProductReview } from "@/actions/product.actions"
import { useSession } from "next-auth/react"

interface Props  {
 open:boolean;
 setOpen: (v:boolean) => void;
 product:IProduct
}
const ReviewModal = ({open,setOpen,product}:Props) => {
  const ratingValues = [
    {
       text: "i don't recommend",
       value: 1
    },
    {
      text: "Weak",
      value: 2
    },
    {
      text: "Acceptable",
      value: 3
    },
    {
      text: "Good",
      value: 4
    },
    {
      text: "Excelent",
      value: 5
    },
  ]
  const [rating,setRating] = useState<number>()
  const [reviewTitle,setReviewTitle] = useState("")
  const [reviewComment,setReviewComment] = useState('')
  const [errors, setErrors] = useState<{ title?: string; comment?: string; rating?: string }>({})

  const initialState: ActionResponse  = {
     success: false,
  }

  const handleSubmit = async (_prevState: ActionResponse,formData: FormData) => {
    const title = formData.get("title")?.toString() || ""
    const comment = formData.get("comment")?.toString() || ""
  
    const newErrors: typeof errors = {}
  
    if (!title.trim())   newErrors.title = "Title is required"
    if (!comment.trim())  newErrors.comment = "Comment is required"
    if (!rating)  newErrors.rating = "Rating is required"
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return initialState // Prevent submit
    }
  
    setErrors({}) // Clear errors if valid
  
    return await addProductReview({}, formData)
  }
  
  const [state, formAction, isPending] = useActionState(handleSubmit, initialState)
  
 // const [state, formAction, isPending] = useActionState(addProductReview, initialState)
  const session = useSession()
  if(session.status === "loading" || session.status === "unauthenticated") return null;
  useEffect(() => {
    if(state.success) {
        setOpen(false)
        setRating(0)
        
    }
  }, [state])
  return (
     <AlertDialog open={open} onOpenChange={()=> setOpen(false)} >
    
    <AlertDialogContent className='bg-white h-[95%] !p-0 !m-0 !rounded-[15px] '>
      <AlertDialogTitle className="!hidden !p-0 !m-0 !w-0 !h-0"></AlertDialogTitle>
      <div className="shadow-md h-fit p-4 ">
     
            <X color="gray" cursor="pointer" onClick={()=> setOpen(false) } />
     
      </div>
     
         <div className='flex px-4  overflow-y-scroll shadow-md py-2.5 flex-col'>
              <h2 className='text-[#000] font-bold text-[24px]  mb-3'>I`m writing a review</h2>
              <div className='flex flex-col  w-full'>
            <div className='flex items-center gap-2'>
                  <img className='lg:w-[90px] w-[70px]  object-cover '
                   src={product.images[0].url || ""} alt={product.name || ""} />
                        <p className='text-base text-black-1'>Item code: {product._id}</p>
             </div>
              <div className='mt-5'>
                  <form action={formAction}>
                  <div className='flex flex-col gap-2'>
                          <label className='label-css' htmlFor="review title">Choose a rating</label>
                         
                          <Select value={rating?.toString()} onValueChange={(value) => setRating(Number(value))}>
                    <SelectTrigger className=" focus-visible:ring-offset-0
                     focus-visible:ring-offset-transparent
                     w-full focus-visible: flex-1 text-[#000]">
                        <SelectValue placeholder="Rating"  />
                    </SelectTrigger>
                    <SelectContent className="bg-[#fff] flex-1 text-black-1">
                        {ratingValues.map((item) => (
                            <SelectItem className="hover:bg-gray-100" 
                            key={item.text} value={item.value.toString()}>
                              <div className="flex items-center gap-1">
                              <p>{item.text} </p>
                              <span>-</span>
                              {[...Array(item.value)].map((_, i) => (
                                <div key={i} className='flex items-center gap-1'>
                          <svg  className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                              </svg>
                                </div>
                                  
                              ))}
                             
                              </div>
                               
                            </SelectItem>
                        ))}
                    </SelectContent>
                  
                        </Select>
                        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                        <input type="hidden" name="rating" value={rating} />
                        <input type="hidden" name="productId" value={product._id} />
                        <input type="hidden" name="userId" value={session.data?.user.id} />
                      </div>
                      <div className='flex flex-col gap-2 mt-5'>
                          <label className='label-css' htmlFor="title">Review title</label>
                          <input  
                           name="title"
                           value={reviewTitle}
                           
                           onChange={(e) => setReviewTitle(e.target.value)}
                           type="text" className='!py-3 !px-5 !bg-gray-100 !w-full  !rounded-[15px]
                             outline-none  text-sm font-medium !border-gray-200' />
                             {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                      </div>
                      <div className='flex flex-col mt-5 gap-2'>
                          <label className='label-css' htmlFor="comment">Write your Review</label>
                          <textarea  
                          name="comment"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          
                           rows={4}  className='!py-3 !px-5 !bg-gray-100 !w-full
                             !rounded-[15px]  outline-none  text-sm font-medium !border-gray-200' />
                             {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
                      </div>
                      <Button 
                       disabled={isPending || !rating}
                       type="submit" className='bg-light_blue hover:bg-secondary mt-5
                       hover:opacity-[0.8]   w-full flex items-center justify-center gap-2
                         rounded-[25px] tracking-wider shadow-md
                         text-white uppercase font-bold h-[45px]  ' >
                        { isPending ? "Loading..." : <> <p>Valider </p> 
                         </> }
                      </Button>
                     
                      {state?.error && (
                         <p className="bg-red-500 py-[5px] px-[8px] rounded-md text-white  mt-3 font-medium text-sm ">
                           Error: {state.error.message}.
                         </p>
                      )}
                  </form>
              </div>
            </div>
         </div>
        
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ReviewModal