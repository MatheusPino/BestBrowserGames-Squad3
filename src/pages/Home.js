// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import HomeComp from "../components/Home/HomeComp";
export default function Home(props) {
  const { userInfo } = props

    return (
    <>
      <HomeComp userInfo={userInfo} />
    </>
  );
}
