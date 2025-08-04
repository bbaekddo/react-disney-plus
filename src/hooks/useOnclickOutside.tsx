import { useEffect } from "react";

const useOnclickOutside = (
	ref: React.RefObject<HTMLDivElement>,
	handler: () => void,
) => {
	useEffect(() => {
		const listner = (event: MouseEvent | TouchEvent) => {
			if (!ref?.current || !ref.current.contains(event.target as Node)) {
				return;
			}

			handler();
		};

		document.addEventListener("mousedown", listner);
		document.addEventListener("touchstart", listner);

		return () => {
			document.removeEventListener("mousedown", listner);
			document.removeEventListener("touchstart", listner);
		};
	}, [ref, handler]);
};

export default useOnclickOutside;
