import { Card } from "react-bootstrap";
import { formatDate } from "../../utils/date.util";


export function GameData({nameDetails, gameData}){

    return (
        <Card>
          <Card.Header as="h5">{nameDetails?.name || ""}</Card.Header>
          <Card.Body>
            <Card.Text>
              Team Full Name {nameDetails?.full_name || ""}
            </Card.Text>
            <Card.Text>
              Total Games in 2021 {gameData.total_count || ""}
            </Card.Text>
            <Card.Text>
              Random Game Details: 
            </Card.Text>
            <Card.Text>
              Date {gameData.date ? formatDate(gameData.date) : ""}
            </Card.Text>
            <Card.Text>
              Home Team {gameData?.home_team?.name || ""}
            </Card.Text>
            <Card.Text>
              Home Team Score {gameData?.home_team_score || ""}
            </Card.Text>
            <Card.Text>
              Visitor Team {gameData?.visitor_team?.name || ""}
            </Card.Text>
            <Card.Text>
              Visitor Team Score {gameData?.visitor_team_score || ""}
            </Card.Text>
          </Card.Body>
        </Card>
    )
}