import { useRef } from "react";
import "./MovieModal.css";
import useOnclickOutside from "../../hooks/useOnclickOutside";

const MovieModal = ({
	backdrop_path,
	title,
	overview,
	name,
	release_date,
	firstt_air_date,
	vote_average,
	setModalOpen,
}: any) => {
	// 영화 모달만 추출
	const movieModalRef = useRef<HTMLDivElement>(null);

	return (
		<div className="presentation" role="presentation">
			<div className="wrapper-modal">
				<div className="modal" ref={movieModalRef}>
					{/* 모달 닫기 버튼 */}
					<button
						type="button"
						// onClick={() =>
						// 	useOnclickOutside(movieModalRef, () => {
						// 		setModalOpen(false);
						// 	})
						// }
						className="modal-close"
						aria-label="모달 닫기"
					>
						X
					</button>

					{/* 포스터 이미지 */}
					<img
						className="modal__poster-img"
						src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
						alt="modal-img"
					/>
					{/* 모달 컨텐츠 */}
					<div className="modal__content">
						<p className="modal__details">
							<span className="modal__user_perc">100% for you</span>{" "}
							{release_date || firstt_air_date}
						</p>
						<h2 className="modal__title">{title || name}</h2>
					</div>
					{/* 모달 오버뷰 */}
					<p className="modal__overview">{overview}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieModal;
