import { useCallback, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import type { ModalProps, ModalStyle } from "./interface"
import styles from "./modal.module.scss"
export const ModalComponent = ({
	onClose,
	children,
	dismissOnOutsideClick = true,
	modalClassName,
	overlay = "dark",
	overlayClassName,
}: ModalProps & ModalStyle) => {
	const modalEl = useRef<HTMLDivElement>(null)

	const handleClickOutside = useCallback(
		(e: MouseEvent) => {
			if (modalEl.current && !modalEl.current.contains(e.target as Node)) {
				onClose()
			}
		},
		[onClose]
	)

	useEffect(() => {
		if (!dismissOnOutsideClick || !document) return
		const handleMouseDown = (e: MouseEvent) => handleClickOutside(e)
		document.addEventListener("mousedown", handleMouseDown)

		return () => {
			document.removeEventListener("mousedown", handleMouseDown)
		}
	}, [dismissOnOutsideClick, handleClickOutside])
	useEffect(() => {
		document.body.style.overflow = "hidden"
		return () => {
			document.body.style.overflow = "auto"
		}
	}, [])
	return (
		<div
			className={[
				styles[`modal-wrapper`],
				`${!!overlayClassName && overlayClassName}`,
			].join(" ")}
			style={{
				background: overlay === "dark" ? "rgba(0, 0, 0, 0.5)" : undefined,
				backdropFilter: overlay === "blur" ? "blur(10px)" : "",
			}}
		>
			<div
				className={[
					`${!!modalClassName ? modalClassName : styles["modal-content"]}`,
				].join(" ")}
				ref={modalEl}
			>
				{children}
			</div>
		</div>
	)
}
