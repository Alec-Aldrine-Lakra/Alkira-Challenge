import { Card, Modal } from "react-bootstrap";
import { formatDate } from "../../utils/date.util";

export function GameData({ nameDetails, gameData }) {
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>{nameDetails?.name || ""}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<table width="80%">
					<tr>
						<td>
							<p>Team Full Name</p>
						</td>
						<td>
							<p> {nameDetails?.full_name || ""}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Total Games in 2021</p>
						</td>
						<td>
							<p>{gameData.total_count || ""}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>
								<strong> Random Game Details: </strong>
							</p>
						</td>
						<td></td>
					</tr>
					<tr>
						<td>
							<p>
								<strong>Date</strong>
							</p>
						</td>
						<td>
							<p>
								<strong>
									{gameData.date ? formatDate(gameData.date) : ""}
								</strong>
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>
								<strong>Home Team</strong>
							</p>
						</td>
						<td>
							<p>
								<strong>{gameData?.home_team?.name || ""}</strong>
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>
								<strong>Home Team Score</strong>
							</p>
						</td>
						<td>
							<p>
								<strong>{gameData?.home_team_score || ""}</strong>
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>
								<strong>Visitor Team</strong>
							</p>
						</td>
						<td>
							<p>
								<strong>{gameData?.visitor_team?.name || ""}</strong>
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>
								<strong>Visitor Team Score</strong>
							</p>
						</td>
						<td>
							<p>
								<strong>{gameData?.visitor_team_score || ""}</strong>
							</p>
						</td>
					</tr>
				</table>
			</Modal.Body>
		</>
	);
}
