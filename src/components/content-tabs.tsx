import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { AppsTable } from "./apps-table";

export function ContentTabs(): JSX.Element {
  const [state, setState] = useState({
    content: <AppsTable />,
  });

  function setTabContent(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (e.target instanceof HTMLAnchorElement) {
      let tabs = document.getElementsByClassName("tab");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("tab-active");
      }
    } else {
      return;
    }

    e.target.classList.add("tab-active");
    if (e.target.textContent === "Applications Updates") {
      setState({
        content: <AppsTable />,
      });

      // console.log("Applications Updates clicked");
      // invoke("get_software_command").then((softwareList) => {
      //   console.log(softwareList);
      // });
      // console.log("Applications Updates done");
    } else if (e.target.textContent === "OS Updates") {
      setState({
        content: <div>OS Updates</div>,
      });
    } else if (e.target.textContent === "Recent Vulnerabilities") {
      setState({
        content: <div>Recent Vulnerabilities</div>,
      });
    }
  }

  return (
    <div>
      <div className="tabs tabs-boxed">
        <a className="tab tab-active" onClick={setTabContent}>
          Applications Updates
        </a>
        <a className="tab" onClick={setTabContent}>
          OS Updates
        </a>
        <a className="tab" onClick={setTabContent}>
          Recent Vulnerabilities
        </a>
      </div>
      {state.content}
    </div>
  );
}
