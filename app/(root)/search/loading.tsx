import LoadingAppState from '@/components/Loaders/LoadingAppState'
import SearchSkeleton from '@/components/skeletons/SearchSkeleton'
import React from 'react'

const loading = () => {
    // TODO: add loading skeleton
  return (
    <div>
         <SearchSkeleton />
    </div>
  )
}

export default loading