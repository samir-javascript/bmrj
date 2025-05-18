import LoadingAppState from '@/components/Loaders/LoadingAppState'
import SearchSkeleton from '@/components/skeletons/SearchSkeleton'
import React from 'react'

const loading = () => {
    // TODO: add loading skeleton
  return (
    <>
         <SearchSkeleton />
    </>
  )
}

export default loading