"use client"
import { useEffect, useState, useCallback, useRef } from "react"

type DebouncedValue<T> = T extends (...args: any[]) => void ? () => void : T
type TimeoutRef = ReturnType<typeof setTimeout> | null

export const useDebounce = <T,>(
	valueOrFunction: T | (() => void),
	delay: number = 300
): DebouncedValue<T> => {
	const [debouncedValue, setDebouncedValue] = useState<T | undefined>(undefined)
	const timeoutRef = useRef<TimeoutRef>(null)

	useEffect(() => {
		if (typeof valueOrFunction === "function") {
			const callback = valueOrFunction as () => void

			timeoutRef.current = setTimeout(() => {
				callback()
			}, delay)

			return () => {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current)
				}
			}
		} else {
			const value = valueOrFunction as T

			timeoutRef.current = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)

			return () => {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current)
				}
			}
		}
	}, [valueOrFunction, delay])

	if (typeof valueOrFunction === "function") {
		return useCallback(() => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
			timeoutRef.current = setTimeout(() => {
				;(valueOrFunction as () => void)()
			}, delay)
		}, [valueOrFunction, delay]) as DebouncedValue<T>
	} else {
		return debouncedValue as DebouncedValue<T>
	}
}
