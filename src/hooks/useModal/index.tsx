"use client"
import React, { useState, useCallback } from "react"
import { ModalComponent } from "./ModalComponent"
import type { ModalProps, ModalStyle } from "./interface"
import { Portal } from "@utils/portal"

export const useModal = () => {
	const [open, setOpen] = useState<boolean>(false)
	const openModal = useCallback(() => {
		setOpen(true)
	}, [])

	const closeModal = useCallback(() => {
		setOpen(false)
	}, [])

	const Modal = ({
		children,
		dismissOnOutsideClick,
		modalClassName,
		overlay,
		overlayClassName,
	}: Omit<ModalProps, "onClose"> & ModalStyle) => {
		return open ? (
			<Portal>
				<ModalComponent
					modalClassName={modalClassName}
					overlay={overlay}
					overlayClassName={overlayClassName}
					dismissOnOutsideClick={dismissOnOutsideClick}
					onClose={closeModal}
				>
					{children}
				</ModalComponent>
			</Portal>
		) : null
	}

	return {
		openModal,
		closeModal,
		Modal,
	}
}
