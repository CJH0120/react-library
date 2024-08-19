import { useDebounce } from "../hooks/useDebounce"
import { renderHook, act } from "@testing-library/react"
import { test, expect } from "bun:test"

test("useDebounce 값변경 테스트 ", async () => {
	const { result, rerender } = renderHook(
		({ value }) => useDebounce(value, 300),
		{ initialProps: { value: "initial" } }
	)

	expect(result.current).toBeUndefined()

	rerender({ value: "updated" })

	await new Promise((resolve) => setTimeout(resolve, 50))

	expect(result.current).toBeUndefined()

	await new Promise((resolve) => setTimeout(resolve, 250))

	expect(result.current).toBe("updated")
})

test("useDebounce 콜백함수 테스트", async () => {
	let callbackCalled = false
	const callback = () => {
		callbackCalled = true
	}

	const { result } = renderHook(() => useDebounce(callback, 500))

	act(() => {
		result.current()
	})

	expect(callbackCalled).toBe(false)

	await new Promise((resolve) => setTimeout(resolve, 400))

	expect(callbackCalled).toBe(false)
	await new Promise((resolve) => setTimeout(resolve, 100))
	expect(callbackCalled).toBe(true)
})

test("useDebounce 클리어 언마운트 테스트", async () => {
	let callbackCalled = false
	const callback = () => {
		callbackCalled = true
	}
	const { result, unmount } = renderHook(() => useDebounce(callback, 20))

	act(() => {
		result.current()
	})
	unmount()
	await new Promise((resolve) => setTimeout(resolve, 20))
	expect(callbackCalled).toBe(false)
})
