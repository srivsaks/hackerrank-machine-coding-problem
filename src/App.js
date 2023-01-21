import "./styles.css";
import { useCallback, useState } from "react";

export default function App() {
  const [option, setOption] = useState("bishop");

  const getInitialState = useCallback(() => {
    return Array.from({ length: 8 }).map((item) => {
      return Array.from({ length: 8 });
    });
  }, []);
  const [arr, setArr] = useState(getInitialState());

  const onSelectOption = useCallback((e) => {
    const type = e.target.value;
    setOption(type);
    setArr(getInitialState());
  }, []);

  const onClickBoard = useCallback(
    (row, col) => {
      if (!option) return;
      const temp = getInitialState();
      if (option === "bishop") {
        let i = row;
        let j = col;

        //cover left top diagonal
        while (i >= 0 && j >= 0) {
          temp[i][j] = "active";
          i--;
          j--;
        }

        //cover right top diagonal
        i = row;
        j = col;
        while (i >= 0 && j < 8) {
          temp[i][j] = "active";
          i--;
          j++;
        }

        //cover left bottom diagonal
        i = row;
        j = col;
        while (i < 8 && j >= 0) {
          temp[i][j] = "active";
          i++;
          j--;
        }

        //cover right bottom diagonal
        i = row;
        j = col;
        while (i < 8 && j < 8) {
          temp[i][j] = "active";
          i++;
          j++;
        }
        setArr(temp);
      } else if (option === "knight") {
        console.log(row, col);
        //check top left
        let i = row;
        let j = col;
        if (i - 2 >= 0 && j - 1 >= 0) {
          temp[i - 2][j - 1] = "active";
        }

        //check top right
        i = row;
        j = col;
        if (i - 2 >= 0 && j + 1 < 8) {
          temp[i - 2][j + 1] = "active";
        }

        //check bottom left
        i = row;
        j = col;
        if (i + 2 < 8 && j - 1 >= 0) {
          temp[i + 2][j - 1] = "active";
        }

        //check bottom right
        i = row;
        j = col;
        if (i + 2 < 8 && j + 1 < 8) {
          temp[i + 2][j + 1] = "active";
        }

        //check left top
        i = row;
        j = col;
        if (i - 1 >= 0 && j - 2 >= 0) {
          temp[i - 1][j - 2] = "active";
        }

        //check left bottom
        i = row;
        j = col;
        if (i + 1 < 8 && j - 2 >= 0) {
          temp[i + 1][j - 2] = "active";
        }

        //check right top
        i = row;
        j = col;
        if (i - 1 >= 0 && j + 2 < 8) {
          temp[i - 1][j + 2] = "active";
        }

        //check right bottom
        i = row;
        j = col;
        if (i + 1 < 8 && j + 2 < 8) {
          temp[i + 1][j + 2] = "active";
        }
        setArr(temp);
      } else {
        // horizontal
        let i = 0;
        let j = col;

        while (i < 8) {
          temp[i][j] = "active";
          i++;
        }

        //vertical
        i = row;
        j = 0;
        while (j < 8) {
          temp[i][j] = "active";
          j++;
        }

        setArr(temp);
      }
    },
    [option, arr]
  );

  return (
    <div>
      {arr.map((row, rIndex) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {row.map((col, cIndex) => {
              return (
                <div
                  onMouseEnter={() => {
                    onClickBoard(rIndex, cIndex);
                  }}
                  onMouseLeave={() => {
                    setArr(getInitialState());
                  }}
                  className="block"
                  style={{
                    background:
                      arr[rIndex][cIndex] === "active"
                        ? "blue"
                        : `${(cIndex + rIndex) % 2 === 0 ? "white" : "black"}`
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
      <select onChange={onSelectOption}>
        <option value="bishop">Bishop</option>
        <option value="rook">Rook</option>
        <option value="knight">Knight</option>
      </select>
    </div>
  );
}
