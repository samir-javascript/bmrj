import React from 'react'

const page = async({searchParams}: {searchParams: Promise<{q: string}>}) => {
    const { q } = await searchParams
  return (
    <div>
         {q}
    </div>
  )
}

export default page