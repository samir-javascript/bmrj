"use client"

import { Button } from "@/components/ui/button"
import { Check, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const steps = [
  { path: "/checkout/cart", label: "Panier", icon: <Check size={16} className="text-white" /> },
  { path: "/checkout/shipping", label: "Address" },
  { path: "/checkout/payment", label: "Paiment" },
]

const Step = ({
  isActive,
  isCompleted,
  label,
  icon,
}: {
  isActive?: boolean
  isCompleted?: boolean
  label: string
  icon?: React.ReactNode
}) => {
  const activeStyle = "bg-white"
  const completedStyle = "bg-light_blue text-white"
  const disabledStyle = "bg-gray-500 text-gray-500 border-gray-500"

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`flex items-center justify-center border w-[20px] h-[20px] p-[2px] rounded-full ${
          isCompleted
            ? "border-light_blue"
            : isActive
            ? "border-white"
            : "border-gray-500"
        }`}
      >
        <div
          className={`rounded-full w-full h-full ${
            isCompleted
              ? completedStyle
              : isActive
              ? activeStyle
              : disabledStyle
          }`}
        >
          {icon && <div className="flex items-center justify-center h-full">{icon}</div>}
        </div>
      </div>
      <span
        className={`mt-[2px] text-sm font-medium ${
          isCompleted ? "text-light_blue" : isActive ? "text-white" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  )
}

const Navbar = () => {
  const pathname = usePathname()

  // Handle success page
  if (pathname === "/checkout/success") {
    return (
      <header className="w-full">
        <nav className="bg-primary w-full text-white px-2 py-2">
          <Link href="/">
          <Image
            loading="eager"
            width={350}
            priority
            height={350}
            className="max-sm:w-[180px] w-[280px] object-contain"
            src="https://www.marjanemall.ma/static/version1742910845/frontend/Marjane/default/fr_FR/images/marjane-logo.svg"
            alt="marjanemall logo"
          />
          </Link>
          
        </nav>
      </header>
    )
  }

  return (
    <header className="w-full">
      <nav className="bg-primary w-full text-white flex-1 lg:gap-14 flex items-center justify-between px-2 py-2">
      <Link href="/">
          <Image
            loading="eager"
            width={350}
            priority
            height={350}
            className="max-sm:w-[180px] w-[280px] object-contain"
            src="https://www.marjanemall.ma/static/version1742910845/frontend/Marjane/default/fr_FR/images/marjane-logo.svg"
            alt="marjanemall logo"
          />
          </Link>
        {/* Desktop Steps */}
        <div className="px-2 py-2.5 lg:flex hidden items-center w-full justify-between">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <Step
                isCompleted={pathname === step.path}
                isActive={pathname === step.path}
                label={step.label}
                icon={step.icon}
              />
              {idx < steps.length - 1 && (
                <span className="border-t flex-1 border-dashed border-gray-400 mx-2 mt-[10px]" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Call Button */}
        <Button className="bg-light_blue hover:bg-light_blue rounded-full h-[35px] flex items-center justify-center gap-1.5" type="button">
          <Phone size={25} />
          <span className="font-medium text-sm">06 09 54 76 92</span>
        </Button>
      </nav>

      {/* Mobile Steps */}
      <div className="lg:hidden px-2 py-2.5 flex items-center w-full justify-between bg-secondary">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <Step
              isCompleted={pathname === step.path}
              isActive={pathname === step.path}
              label={step.label}
              icon={step.icon}
            />
            {idx < steps.length - 1 && (
              <span className="border-t flex-1 border-dashed border-gray-400 mx-2 mt-[10px]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </header>
  )
}

export default Navbar
