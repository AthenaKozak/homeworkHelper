import React, { useState, useEffect } from "react";
import Assignment from "./Assignment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

// fake data must be replaced with data from DB
const fakeDataArray = [
  {
    title: "Final Assignment - SSD",
    description: "Group Project Web APP",
    date: new Date(2020, 2, 20),
    isDone: false
  },
  {
    title: "FullStack JS",
    description: " bla bla bla",
    date: new Date(2020, 3, 6),
    isDone: false
  },
  {
    title: "Passion Project",
    description: "bla bla bla2",
    date: new Date(2020, 4, 22),
    isDone: true
  },
  {
    title: "bla bla Project",
    description: "bla bla bla3",
    date: new Date(2020, 5, 1),
    isDone: true
  }
];

export default function MyAssignments() {
  const [active, setActive] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [assignments, setAssignments] = useState([]);

  const URL = "https://nameless-headland-04100.herokuapp.com/api/assignments";

  const getMyAssignmentsFromServer = async () => {
    // Here fetch request GET
    var result = fakeDataArray;

    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "accplication/json",
      },
    })
    .then((response) => {
      return response.json();
      console.log(response)
    })
    .then((json) => {
          // sort assignments by date
      json.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
    setAssignments(json);
    })

    .catch(function (error) {
      //alert(error)
    })
  }

  useEffect(() => {
    getMyAssignmentsFromServer();
  }, []);

  function showAllAssignments() {
    setCompleted(true);
    setActive(true);
  }

  function showOnlyActiveAssignments() {
    setCompleted(false);
    setActive(true);
  }

  function showOnlyCompletedAssignments() {
    setCompleted(true);
    setActive(false);
  }

  return (
    <div>
      <div className="header">
        <div className="brand">
          <img alt="Logo" src={Logo} />
          <h1>My Assignments</h1>
        </div>
        <div className="sortLinks">
          <p className="headerLink" onClick={showAllAssignments}>
            All
          </p>
          <p className="headerLink" onClick={showOnlyActiveAssignments}>
            Active
          </p>
          <p className="headerLink" onClick={showOnlyCompletedAssignments}>
            Completed
          </p>
        </div>
      </div>
      <div className="wrapper">
        <Link to="/add">
          <FontAwesomeIcon
            className="addIcon fill-gradient-linear"
            icon={faPlusCircle}
          />
        </Link>
        {assignments.map(assignment =>
          (completed && assignment.isDone) || (active && !assignment.isDone) ? (
            <Assignment key={assignment.title} assignment={assignment} />
          ) : (
            <p key={assignment.title}></p>
          )
        )}
      </div>
      <svg>
        <linearGradient id="linear">
          <stop className="linear-stop1" offset="0%"></stop>
          <stop className="linear-stop2" offset="50%"></stop>
          <stop className="linear-stop3" offset="100%"></stop>
        </linearGradient>
      </svg>
    </div>
  );
}
