import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        " bg-white outline-none focus:none text-base text-nueutrals-40 font-ui p-2",
        className
      )}
      {...props}
    />
  )
}

export { Input }
