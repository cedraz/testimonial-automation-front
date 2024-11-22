import React from "react"
import { Separator } from "@/components/ui/separator"

interface TextSeparatorProps {
  text: string
  className?: string
}

export default function TextSeparator({ text, className = "" }: TextSeparatorProps) {
  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className="flex-grow overflow-hidden">
        <Separator />
      </div>
      <span className="flex-shrink-0 px-3 text-sm text-muted-foreground">{text}</span>
      <div className="flex-grow overflow-hidden">
        <Separator />
      </div>
    </div>
  )
}