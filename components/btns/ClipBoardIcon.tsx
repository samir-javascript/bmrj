"use client"
import { useToast } from '@/hooks/use-toast'
import { CheckIcon, ClipboardIcon } from 'lucide-react'
import React, { useState } from 'react'

const ClipBoardIcon = () => {
    const { toast } = useToast()
    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
  navigator.clipboard.writeText("BBD10")
  setCopied(true)
    toast({ title: "Copié", description: "Le code promo BBD10 a été copié 🎉" })
  // Reset back to ClipboardIcon after 2 seconds
  setTimeout(() => setCopied(false), 2000)
}
  return (
  copied ? (
  <CheckIcon size={18} color="white" className="transition-all duration-200" />
) : (
  <ClipboardIcon
    size={18}
    color="white"
    onClick={handleCopy}
    className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
  />
)
  )
}

export default ClipBoardIcon