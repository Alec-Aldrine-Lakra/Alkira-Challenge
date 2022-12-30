import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useGetFetch } from "./services/fetch.service";
import Table from "react-bootstrap/Table";
import { PaginationTeam } from "./components/paginationTeam/paginationTeam";
import { GameData } from "./components/gameData/gameData";
import { pageSize } from "./constants/index.constants";
import { Modal } from "react-bootstrap";
import {SearchIcon} from "./components/icons/index";

function App() {
	const [searchText, setSearchText] = useState("");
	const [teamList, setTeamList] = useState([]);
	const [teamMetaData, setTeamMetaData] = useState({});
	const [nameDetails, setNameDetails] = useState({
		name: "",
		full_name: "",
	});
	const [gameData, setGameData] = useState({});
	const { data: result } = useGetFetch("teams");

	const [currentIndex, setCurrentIndex] = useState(0);

	const [showDialog, setShowDialog] = useState(false);

	useEffect(() => {
		if (typeof searchText === "string" && searchText.trim().length) {
			// fetch()
		}
	}, [searchText]);

	useEffect(() => {
		document.title = "NBA Teams";
	}, []);

	useEffect(() => {
		if (result && typeof result === "object") {
			setTeamList(result.data.slice(currentIndex, currentIndex + pageSize));
			const total_pages = Math.ceil(result.data.length / pageSize);
			setTeamMetaData({
				total_pages,
				current_page: currentIndex / 7,
			});
		}
	}, [currentIndex, result]);

	const fetchGameDetails = (id, name, full_name) => {
		fetch(
			process.env.REACT_APP_SERVER_URL + "games?seasons[]=2021&team_ids[]=" + id
		)
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				const data = result.data[0] || {};
				data.total_count = result.meta.total_count;
				setGameData(data);
				setNameDetails({ name, full_name });
				setShowDialog(true);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="App">
			<header>
				<h1>NBA Teams</h1>
			</header>
			<form>
				<span><SearchIcon height={14} width={14}/></span>
				<DebounceInput
					type="text"
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value);
					}}
					debounceTimeout={500}
				/>
			</form>
			{teamList.length > 0 && (
				<div className="result-container">
					<Table bordered hover responsive>
						<thead>
							<tr>
								<th>Team Name</th>
								<th>City</th>
								<th>Abbreviation</th>
								<th>Conference</th>
								<th>Division</th>
							</tr>
						</thead>
						<tbody>
							{teamList.map(
								({
									id,
									name,
									city,
									full_name,
									abbreviation,
									conference,
									division,
								}) => {
									return (
										<tr
											key={id}
											onClick={() => {
												fetchGameDetails(id, name, full_name);
											}}
										>
											<td>{name}</td>
											<td>{city}</td>
											<td>{abbreviation}</td>
											<td>{conference}</td>
											<td>{division}</td>
										</tr>
									);
								}
							)}
						</tbody>
					</Table>
					<PaginationTeam
						metaData={teamMetaData}
						setCurrentPage={(index) => {
							setCurrentIndex(index * pageSize);
						}}
					/>
					<Modal
						show={showDialog}
						onHide={() => {
							setShowDialog(!showDialog);
						}}
					>
						<GameData nameDetails={nameDetails} gameData={gameData} />
					</Modal>
				</div>
			)}
		</div>
	);
}

export default App;
