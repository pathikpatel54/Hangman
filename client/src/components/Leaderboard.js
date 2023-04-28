import { Center, Table } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchScores, selectAllScores } from "../features/score/scoresSlice";
import { useState } from "react";

const Leaderboard = () => {
  const scores = useSelector(selectAllScores);
  const dispatch = useDispatch();

  useState(() => {
    dispatch(fetchScores());
  }, []);

  console.log(scores);
  const rows = scores.map((element) => (
    <tr key={element._id}>
      <td>{element.name}</td>
      <td>{element.score}</td>
    </tr>
  ));

  return (
    <Center>
      <Table highlightOnHover withBorder w={500}>
        <thead>
          <tr>
            <th>Player name</th>
            <th>Player score</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Center>
  );
};

export default Leaderboard;
