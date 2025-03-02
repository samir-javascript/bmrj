"use client"
import { useState } from "react"
import { Search, X } from "lucide-react"

const SearchInput = () => {
  const [value,setValue] = useState('')
  return (
    <div className="flex-1 flex items-center justify-between bg-white rounded-lg
      px-2.5 py-3
    ">
       <input value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 border-none placeholder:font-medium placeholder:text-sm outline-none focus:border-none focus-within:outline-none focus:outline-none"
        type="text" placeholder="Cherchez une produit, une marque" />
        {!value &&  <Search className="text-primary cursor-pointer"  size={22}/>}
        {value &&  <X onClick={() => setValue("")} className="text-white rounded-full bg-black cursor-pointer"  size={22}/>}
       
    </div>
  )
}

export default SearchInput