import React from 'react'

const page = async({params}: {params: Promise<{categoryName:string}>}) => {
    const { categoryName} = await params;
  return (
    <div>page</div>
  )
}

export default page