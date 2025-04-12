'use client'

import Alert from '@/components/shared/Alert'
import { ROUTES } from '@/constants/routes'
import { IShipping } from '@/database/models/shippingAdress.model'
import { useAppSelector } from '@/hooks/user-redux'

import Link from 'next/link'
import React from 'react'

const AddressComponent = ({ address }: { address: IShipping | undefined }) => {
  const { shippingAddress } = useAppSelector((state) => state.shipping)

  const billingAddress = shippingAddress || address
  const deliveryAddress = shippingAddress || address

  const noAddresses = !shippingAddress && !address

  const renderAddressBlock = (label: string, data: IShipping | undefined) => (
    <div className="flex flex-col space-y-2 mt-3">
      <h4 className="text-[15px] font-semibold text-[#333]">{label}</h4>
      {data ? (
        <div className="flex flex-col space-y-2">
          <p className="small-medium text-gray-500">Mr {data.name || ""}</p>
          <p className="small-medium text-gray-500">
            {data.city || ''} {data.address || ''}
          </p>
          <p className="small-medium text-gray-500">
            {data.city?.toUpperCase() || ''}, {data.postalCode || ''} {data.country || ''}
          </p>
          <p className="small-medium text-gray-500">{data.phoneNumber || ''}</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2 text-gray-500">
          <p className="small-medium">No address available</p>
        </div>
      )}
      <Link
        href={ROUTES.editShipping(data?._id || '')}
        className="text-light_blue text-sm paragraph-semibold underline"
      >
        Modifier l’adresse {label === 'Adresse de livraison par défaut' ? 'de la livraison' : 'de facturation'}
      </Link>
    </div>
  )

  return (
    <>
      {noAddresses ? (
        <div className="my-5">
          <Alert message="You don't have any other addresses in your address book" />
        </div>
      ) : (
        <div className="flex pb-5 flex-col w-full lg:flex-row lg:justify-between gap-7">
          <div className="flex flex-col gap-2">
            {renderAddressBlock('Adresse de facturation par défaut', billingAddress)}
          </div>
          <div className="flex flex-col gap-2">
            {renderAddressBlock('Adresse de livraison par défaut', deliveryAddress)}
          </div>
        </div>
      )}
    </>
  )
}

export default AddressComponent
