"use client"
import { deleteSelectedUsers } from '@/actions/user.actions'
import LoadingAppState from '@/components/Loaders/LoadingAppState'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IUser } from '@/database/models/user.model'
import { useToast } from '@/hooks/use-toast'
import { formatFullDateTime, formatPrice } from '@/lib/utils'
import { ArrowDown, Check, Trash, X } from 'lucide-react'
import React, {useState} from 'react'

const SelectCheckboxUsers = ({data}: {
    data: {
        users: IUser[];
        isNext: boolean
    }
}) => {
  const [selectedUsers,setSelectedUsers] = useState<string[]>([])
  const [selectAll,setSelectAll] = useState(false)
  const [loading,setLoading] = useState(false)
  const {toast} = useToast()
  const handleDeleteUsers = async()=> {
     setLoading(true)
     try {
        const {error,success,message} = await deleteSelectedUsers({usersId:selectedUsers})
        if(error) {
           return toast({
            title: "Error occured!",
            description: error.message,
            variant: "destructive"
           })
        }else if(success) {
           setSelectedUsers([])
          return toast({
            title: "Success",
            description: message, 
           })
        }
     } catch (error) {
        console.log(error)
     }finally {
        setLoading(false)
     }
  }
  return (
    <React.Fragment>
        {loading && (
           <LoadingAppState />
        )}
    {selectedUsers.length > 0 && (
 <div className="bg-light_blue py-3 px-4 rounded-tr-lg rounded-tl-lg flex items-center justify-between ">
 <div className='flex items-center gap-2.5'>
   <div className='w-[30px] h-[30px] rounded-full transition-all duration-200 flex items-center justify-center hover:bg-secondary  '>
      <X onClick={()=> setSelectedUsers([])} color="gray" className="cursor-pointer" size={20} />
   </div>
     
     <p className='text-white font-medium text-[16px] tracking-wide'>
     {selectedUsers.length} item{selectedUsers.length > 1 ? 's' : ''} selected
     </p>
 </div>
 <Button onClick={()=> handleDeleteUsers()} className='bg-transparent w-fit h-fit hover:bg-red-300 '>
     <Trash color="red" />
     <p className='text-red-500 uppercase font-medium text-[15px] '>Delete</p>
 </Button>
</div>
    )}
   
{/** btns go here */}

<table className="min-w-full max-sm:hidden divide-y divide-gray-600 text-sm text-left">
<thead className=" text-white bg-black font-semibold">
<tr>
<th className="px-4 py-3">
<Checkbox 
  checked={selectAll}
  onCheckedChange={(checked)=> {
      if(checked) {
        const usersIds = data.users.map((user) => user._id)
        setSelectedUsers(usersIds)
      }else {
        setSelectedUsers([])
      }
      setSelectAll(!!checked)
  }}
/>
</th>
<th className="px-4 py-3">
<span>Name</span>

</th>
<th className="px-4 flex items-center gap-2 py-3">
<span>Last seen</span>
<ArrowDown />
</th>
<th className="px-4 py-3">
Orders
</th>
<th className="px-4 py-3">
Total spent
</th>
<th className="px-4 py-3 lg:whitespace-nowrap">
Latest purchase
</th>
<th className="px-4 py-3">
News
</th>
<th className="px-4 py-3">
Segments
</th>
</tr>
</thead>
<tbody style={{background: "rgb(30,30,30)"}} className="divide-y   divide-gray-600">
{/* Example row — map through your data here */}
{data?.users.map((user,index)=> (
<tr className='hover:bg-gray-900 cursor-pointer' key={index}>
<td className="px-4 py-3 text-white">
  <Checkbox
   checked={selectedUsers.includes(user._id)}
   onCheckedChange={(checked)=> {
    let updated: string[]
    if(checked) {
       updated = [...selectedUsers, user._id]
    }else {
      updated = selectedUsers.filter((id)=> id !== user._id )
    }
    setSelectedUsers(updated)
    setSelectAll(updated.length === data.users.length)
   }}
   />
</td>
<td className="px-4  py-3 flex items-center gap-2">
  <img className='rounded-full w-[30px] h-[30px] object-contain' src={user.image || "https://marmelab.com/posters/avatar-175.jpeg?size=25x25"} alt={user.name} />
  <span className='text-light_blue underline font-medium text-normal'>
      {user.name} {" "} {user.lastName}
  </span>
</td>
<td className="px-4 py-3">
 <span className='text-white font-medium text-normal '>
  {formatFullDateTime(new Date(user.lastSeen))}
 </span>
 </td>
<td className="px-4 py-3 flex mx-auto items-center h-full text-center  font-medium">
<span className='text-white font-medium text-normal '>
  2
 </span>
</td>
<td className="px-4 py-3 ">
<p className='font-bold text-white text-[16px] '>
    {formatPrice(50.04)}
 </p>
</td>
<td className="px-4 py-3 flex flex-col">
 <span className="text-white font-medium text-normal">
      09/25/2025
 </span>
 <span className="text-white font-medium text-normal">
      17:08:33
 </span>
</td>

<td className="px-4 py-3">
  {user.hasNewsLetter ?  <Check  className='text-gray-200' /> : <X  className='text-gray-200' />} 
</td>
<td className="px-4 py-3">
 <div className='rounded-full flex items-center py-[3px] px-[6px] justify-center w-fit bg-[#333]  '>
 <span className="text-white font-normal whitespace-nowrap text-normal">
      ordered once
 </span>
 </div>


 </td>
</tr>
) )}

{/* Repeat rows */}
</tbody>
</table>
</React.Fragment>
  )
}

export default SelectCheckboxUsers