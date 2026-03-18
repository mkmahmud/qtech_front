"use client"
import { useForm as useReactHookForm, FieldValues, DefaultValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// 1. Constrain T to FieldValues (which is the internal RHF type for form data)
export function useForm<T extends FieldValues>(
    schema: any, // 2. Use RHF's DefaultValues type instead of Partial<T>
    defaultValues?: Partial<T>
) {
    return useReactHookForm<T>({

        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T> | undefined,
        mode: "onSubmit",
    })
}