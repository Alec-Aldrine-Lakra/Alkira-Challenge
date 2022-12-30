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
import { SearchIcon } from "./components/icons/index";

function App() {
  const [searchText, setSearchText] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [teamMetaData, setTeamMetaData] = useState({});
  const [nameDetails, setNameDetails] = useState({
    name: "",
    full_name: "",
  });
  const [sortMetaData, setSortMetaData] = useState({});

  const [gameData, setGameData] = useState({});
  const { data: result } = useGetFetch("teams");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    document.title = "NBA Teams";
  }, []);

  useEffect(() => {
    if (result && typeof result === "object") {
	  const data = result.data;
      if (!searchText) {
        setTeamList(data.slice(currentIndex, currentIndex + pageSize));
        const total_pages = Math.ceil(data.length / pageSize);
        setTeamMetaData({
          total_pages,
          current_page: currentIndex / 7,
        });
      } else {
        if (data.length && searchText) {
		  const newData = data.filter((team) => {
			return JSON.stringify(team).toLowerCase().includes(searchText.toLowerCase());
		  });
		  setTeamList(newData.slice(currentIndex, currentIndex + pageSize));
		  const total_pages = Math.ceil(newData.length / pageSize);
		  setTeamMetaData({
			total_pages,
			current_page: currentIndex / 7,
		  });
        }
      }
    }
  }, [currentIndex, result, searchText]);

  const fetchGameDetails = (id, name, full_name) => {
    setActiveId(id);
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

  const sortByColumn = (e)=>{
	const key = e.target.id;
	let isAscending = false;
	if(sortMetaData[key]) {
		if(sortMetaData[key].isAsc) {
			result.data = result.data.sort((team1, team2) => {
				return team1[key].localeCompare(team2[key]);
			});
			isAscending = false; // setting in descending
		}  else {
			result.data = result.data.sort((team1, team2) => {
				return team2[key].localeCompare(team1[key]);
			});
			isAscending = true;
		}
	} else {
		result.data = result.data.sort((team1, team2) => {
			return team1[key].localeCompare(team2[key]);
		});
		isAscending = true;
	}
	setTeamList(result.data.slice(currentIndex, currentIndex + pageSize));
	setSortMetaData({
		...sortMetaData,
		[key]: {
			isAsc: isAscending
		}
	})

  }

  return (
    <div className="App">
      <header>
        <h1>NBA Teams</h1>
      </header>
      <form>
        <label htmlFor="searchText">
          <SearchIcon height={14} width={14} />
        </label>
        <DebounceInput
          type="text"
          id="searchText"
          value={searchText}
          onChange={(e) => {
            const value = e.target.value;
			setCurrentIndex(0);
            setSearchText(value.trim());
          }}
          debounceTimeout={500}
        />
      </form>
      {teamList.length > 0 && (
        <div className="result-container">
          <Table hover responsive>
            <thead>
              <tr onClick={sortByColumn}>
                <th id="name">Team Name</th>
                <th id="city">City</th>
                <th id="abbreviation">Abbreviation</th>
                <th id="conference">Conference</th>
                <th id="division">Division</th>
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
                      className={id === activeId ? `active` : ``}
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
              setActiveId("");
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
