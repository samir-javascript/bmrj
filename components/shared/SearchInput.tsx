"use client"
import { useState, useRef, useEffect } from "react"
import { ChevronRight, Loader, LoaderIcon, Search, SearchIcon, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { IProduct } from "@/database/models/product.model"
import { getSuggestionResult } from "@/actions/product.actions"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

const SearchInput = () => {
  const [value,setValue] = useState<string>('')
  const [open,setOpen] = useState<boolean>(false)
  const [pending,setPending] = useState<boolean>(false)
  const [suggestions,setSuggestions] = useState<IProduct[]>([])
  const pathname = usePathname()
  const router = useRouter()
  const searchContainerRef = useRef(null)
  const handleSearch = ()=> {
    if(value.trim()) {
       router.push(`/search?q=${value}`)
    }else {
       router.push("/")
    }
  }
  useEffect(() => {
    setOpen(false)
    setValue("")
  },[pathname])


  useEffect(() => {
      const fetchResult = async()=> {
        setSuggestions([])
        setPending(true)
        try {
           const {success, data} = await getSuggestionResult({
              query: value
           })
           if(success)  {
              setSuggestions(data?.products || [])
              setPending(false)
           }
        } catch (error) {
           console.log(error)
        }finally {
           setPending(false)
        }
      }
      const delayDebouncedFunction = setTimeout(() => {
          if(value) {
             fetchResult()
          }
      }, 500)
      return ()=> {
        clearTimeout(delayDebouncedFunction)
      }
  }, [value])
useEffect(() => {
  const handleOutSideClick = (event:any)=> {
    // @ts-ignore
     if(searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setOpen(false)
        setValue('')
     }
  }
  document.addEventListener('click', handleOutSideClick)
  return ()=> {
     document.removeEventListener('click', handleOutSideClick)
  }
}, [])
  return (
    <>
    {open && (
       <div style={{backgroundColor: "rgba(0, 0, 0, .3)"}} className="fixed z-[999] top-0 left-0 inset-0 h-full w-full " />
    )}
  <div ref={searchContainerRef} className={`flex-1 relative  flex items-center justify-between bg-white rounded-lg
      px-2.5 py-3 ${open && "!z-[999999999999999999999999999999999999999]"}`}>
       <input onKeyPress={(e)=> {
         if(e.key === "Enter") {
          handleSearch()
         } 
       }} value={value} onChange={(e) => {
          setValue(e.target.value)
          if(!open) setOpen(true)
          if(e.target.value === "" && open) setOpen(false)
       }} className="flex-1 border-none placeholder:font-medium placeholder:text-sm outline-none focus:border-none focus-within:outline-none focus:outline-none"
        type="text" placeholder="Cherchez une produit, une marque" />
       {
  pending ? (
    <LoaderIcon size={20} color="gray" className="animate-spin" />
  ) : (
    <Search onClick={()=> handleSearch()} size={22} className="text-primary cursor-pointer" /> 
  )}

        {/* {value &&  <X onClick={() => setValue("")} className="text-white rounded-full bg-black cursor-pointer"  size={22}/>} */}
        {value !== "" &&  open && (
  <div className="absolute  shadow-md bg-white rounded-xl
   !z-[999999999999999999999999999999999999999] top-[40px] left-0 right-0 flex-col mt-4 w-full pt-3 flex  ">
     <Link href={`/search?q=${value}`} className="px-3 mb-4 flex items-center gap-2">
     <SearchIcon  color="gray" size={18} />
     <p className="text-red-700 font-medium text-base  ">{value} </p>
     </Link>
  <div className="px-3">
       <h2 className="text-[#000] mb-3 capitalize text-[20px] font-semibold ">
         research suggestions
       </h2>
  </div>
  {/* https://photos-de.starshiners.ro/109144/707899-56x84-lo.jpg */}
 
  <div className='w-full   h-[10px] bg-gray-100  ' />
  <div className="w-full px-3 flex items-center justify-between mt-2">
           <p className="font-semibold text-[#222] text-xs ">Products</p>
           <Link className='font-semibold flex items-center gap-2 text-[#222] text-sm ' href={`/search?q=${value}`}>
               <span className="underline">See All</span>
               <ChevronRight size={16} /> 
           </Link> 
      </div>
 { suggestions.length  > 0 ? (
   

     
   <div className="px-3  gap-3 flex pb-2  items-center w-full">
      
   {suggestions.map((item,index:number) => (
      <Link href={`/products/${item._id}`} className="flex border-b p-3 hover:bg-gray-200 border-gray-400  flex-col gap-3" key={index}>
            <img className="w-[100px] object-contain " src={item?.images[0].url || ""} alt={item?.name} />
            <div className="flex flex-col ">
                <p className="line-clamp-3 text-[#222] text-[13px] font-normal max-w-[100px] ">{item.name} </p>
               
                <h3 className="font-bold text-light_blue text-[17px] ">{formatPrice(item?.price)} </h3>
                <h3 className="font-bold text-[#333] text-[17px] line-through ">{formatPrice(Number(item?.prevPrice))}</h3>
            </div>
      </Link>
   ))}
</div>
  
 ): (
     <div className="px-3 w-full my-2">
      {pending ? (
        <div className="w-full flex items-center justify-center">
            <Loader size={45} className="text-light_blue animate-spin" />
        </div>
      ): (
         <p className="text-sm text-gray-500 font-medium ">No result found! maybe you should try another query.</p>
      )}  
    </div>
 )}
 
  
  

</div>
        )}
    </div>
    </>
  
  )
}

export default SearchInput