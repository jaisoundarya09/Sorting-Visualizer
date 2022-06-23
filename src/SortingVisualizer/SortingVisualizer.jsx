import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/sortingAlgo.js";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "yellow";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
    this.render();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 40; i++) {
      array.push(randomIntInterval(5, 2000));
    }
    this.setState({ array });

    const arrayBars = document.getElementsByClassName("array-bar");
    console.log(arrayBars[1]);
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight / 3}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  reload() {
    window.location.reload();
  }
  render() {
    const { array } = this.state;

    return (
      <div className=" bg-[#FAEDF0] w-full flex-auto mx-auto py-40 px-40  justify-center">
        {array.map((value, id) => (
          <div
            className="array-bar"
            key={id}
            style={{
              height: `${Math.floor(value / 3)}px`,
              width: "2%",
              display: "inline-block",
              backgroundColor: "#ec255a",
            }}
          ></div>
        ))}
        <div className="m-4 flex justify-center content-center">
          <div className="">
            <button
              className="text-black font-extrabold border-2 border-[#292C6D] px-6 py-3 my-2 flex items-center hover:bg-[#292C6D] hover:border-white hover:text-white"
              onClick={() => this.reload()}
            >
              Generate Array
            </button>
          </div>
          <div className="">
            <button
              className="text-black mx-5 font-extrabold border-2 bg-green-500 border-[#292C6D] px-6 py-3 my-2 flex items-center hover:bg-gray-500 hover:border-black hover:text-white"
              onClick={() => this.mergeSort()}
            >
              Merge Sort
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function randomIntInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
