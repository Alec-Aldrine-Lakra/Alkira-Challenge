/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./customDialog.css";
import { CloseIcon } from "../icons/index";
function CustomDialog({ isShowing, hide, direction, ...props }) {
	return isShowing
		? ReactDOM.createPortal(
				<>
					<div className={"modal-overlay " + direction}>
						<div className="modal-wrapper">
							<button
								type="button"
								className="modal-close-button"
								onClick={hide}
							>
								<CloseIcon size="14px" />
							</button>
							{props.children}
						</div>
					</div>

					<style jsx="true">{`
						.modal-overlay {
							position: fixed;
							top: 0;
							left: 0;
							width: 100vw;
							height: 100vh;
							z-index: 1040;
							background-color: rgba(0, 0, 0, 0.2);
						}

						.modal-close-button {
							font-size: 1.8rem;
							font-weight: 700;
							color: #666666;
							cursor: pointer;
							border: none;
							background: transparent;
							position: absolute;
							right: 10px;
							top: 10px;
						}
					`}</style>
				</>,
				document.body
		  )
		: null;
}

CustomDialog.propTypes = {
	isShowing: PropTypes.bool,
	hide: PropTypes.func,
	direction: PropTypes.string,
};

export default CustomDialog;
