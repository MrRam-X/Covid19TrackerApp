import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [allCases, setAllCases] = useState([]);
  const [searchcountry, setSearchCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])

      .then(function (response) {
        // handle success
        console.log(response[0].data);
        setAllCases(response[0].data);
        setAllCountries(response[1].data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const date = new Date(parseInt(allCases.updated));
  const lastUpdated = date.toString();

  const filterCountry = allCountries.filter((item) => {
    return item.country === searchcountry;
  });

  const showCountry = filterCountry.map((data, i) => {
    return (
      <Card
        key={i}
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases : {data.cases}</Card.Text>
          <Card.Text>Deaths : {data.deaths}</Card.Text>
          <Card.Text>Recovered : {data.recovered}</Card.Text>
          <Card.Text>Today's cases : {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths : {data.todayDeaths}</Card.Text>
          <Card.Text>Active : {data.active}</Card.Text>
          <Card.Text>Critical : {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div className="App">
      <CardDeck>
        <Card
          bg="light"
          text="dark"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Img
            variant="top"
            src="https://www.yorkgraphicdesigners.co.uk/wp-content/uploads/2020/04/coronavirus_logo-2-833x321.jpg"
          />
          <Card.Body>
            <Card.Title>Covid 19 Tracker App</Card.Title>
            <Card.Text>Stay Safe, Stay Home</Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      <CardDeck>
        <Card
          bg="secondary"
          text="light"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{allCases.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text="light"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{allCases.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text="light"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{allCases.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            onChange={(e) => setSearchCountry(e.target.value)}
            type="text"
            placeholder="Search Country"
          />
        </Form.Group>
      </Form>

      <CardDeck>{showCountry}</CardDeck>

      <CardDeck>
        <Card
          bg="light"
          text="dark"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Img
            variant="top"
            src="https://t3.ftcdn.net/jpg/03/45/53/70/360_F_345537024_nx5X4dVxN2YntEeqM3rikUOjkDIy7aQk.jpg"
          />
          <Card.Body></Card.Body>
          <Card.Footer>Wear Mask</Card.Footer>
        </Card>
        <Card
          bg="light"
          text="dark"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Img
            variant="top"
            src="https://www.nursingcenter.com/getattachment/1a102fc1-3910-488c-b8c9-59c2fa274d69/physical-distancing-instead-of-social-distancing.aspx"
          />
          <Card.Body></Card.Body>
          <Card.Footer>Maintain Social Distance</Card.Footer>
        </Card>
        <Card
          bg="light"
          text="dark"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Img
            variant="top"
            src="https://www.cleanlink.com/resources/editorial/2019/hand-sanitizer-24071.png"
          />
          <Card.Body></Card.Body>
          <Card.Footer>Sanitize your hands</Card.Footer>
        </Card>
      </CardDeck>
    </div>
  );
}

export default App;
