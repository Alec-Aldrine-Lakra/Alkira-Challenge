import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useGetFetch } from "./services/fetch.service";
import Table from "react-bootstrap/Table";
import { PaginationTeam } from "./components/paginationTeam/paginationTeam";
import { GameData } from "./components/gameData/gameData";
import CustomDialog from "./components/customDialog/customDialog";

function App() {
  const [searchText, setSearchText] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [teamMetaData, setTeamMetaData] = useState({});
  const [nameDetails, setNameDetails] = useState({
    name: "",
    full_name: ""
  });
  const [gameData, setGameData] = useState({});
  const { data: result } = useGetFetch("teams");

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (typeof searchText === "string" && searchText.trim().length) {
      // fetch()
    }
  }, [searchText]);

  useEffect(() => {
    if (result && typeof result === "object") {
      setTeamList(result.data || []);
      setTeamMetaData(result.meta || {});
    }
  }, [result]);

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
        setNameDetails({name, full_name});
        setShowDialog(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <header>NBA Teams</header>
      <form>
        <DebounceInput
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder={`Search Movies`}
          debounceTimeout={500}
        />
      </form>
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
              ({ id, name, city, full_name, abbreviation, conference, division }) => {
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
        <PaginationTeam metaData={teamMetaData} />
        <CustomDialog
          direction="right"
					isShowing={showDialog}
					hide={()=>{
            setShowDialog(!showDialog);
          }}
        >
          <GameData nameDetails={nameDetails} gameData={gameData} />
        </CustomDialog>
      </div>
    </div>
  );
}

export default App;
