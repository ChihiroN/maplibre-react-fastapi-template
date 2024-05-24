import React, { useState, useEffect } from "react";

const useModal = (initialShow: boolean): [boolean, () => void] => {
	const [show, setShow] = useState(initialShow);

	const closeModal = () => setShow(false);

	useEffect(() => {
		setShow(initialShow);
	}, [initialShow]);

	return [show, closeModal];
};

export default useModal;