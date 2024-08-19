import { test, expect } from "bun:test"
import { render } from "@testing-library/react"
import { Portal } from "../utils/portal"
import React from "react"

test("Create Portal 테스팅 코드 body 안에 엘리먼트 찾기", () => {
	render(
		<Portal>
			<p>HELLO CREATE PORTAL</p>
		</Portal>
	)
	const P = document.body.querySelector("p")
	expect(P).toBeTruthy()
	expect(P?.innerText).toBe("HELLO CREATE PORTAL")
})
