/* eslint-disable */
import React, { Component } from "react";
import { render } from "react-dom";
import {} from "./src/index.scss";
import a, { traverseTree, judgeBrowser } from "./src/index.js";
class App extends React.Component {
  componentDidMount() {
    let treeData = [];
    console.log(judgeBrowser());
    console.log(a);
  }

  render() {
    return [
      <div key="1">查看console了解输出结果</div>,
      <div key="2" className="wrap" />
    ];
  }
}
render(<App />, document.getElementById("content"));
