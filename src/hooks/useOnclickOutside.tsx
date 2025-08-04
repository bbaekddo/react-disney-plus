import { useEffect } from "react";

const useOnclickOutside = (
	ref: React.RefObject<HTMLDivElement | null>,
	handler: () => void,
) => {
	useEffect(() => {
		const listner = (event: MouseEvent | TouchEvent) => {
			// ref가 null이거나 클릭된 요소가 ref 내부에 있으면 아무것도 하지 않음
			if (!ref?.current || ref.current.contains(event.target as Node)) {
				return;
			}

			// 외부 클릭 시에만 핸들러 실행
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
