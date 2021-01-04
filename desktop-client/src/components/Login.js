import { GoogleLoginButton } from "react-social-login-buttons";
import {
  isBrowser,
  isMobile
} from "react-device-detect";

export default function Login() {
  function handleClick() {
    window.location.href = "/auth/google";
  }
  return <div id="loginPageContainer">
    <div id="watchDiaryIntro">
      <h1 className="WatchDiaryTitle" style={{marginBottom: "0"}}>Movelp</h1>
      <div className="WatchDiarySubTitleWrapper">
        <img src={process.env.PUBLIC_URL + '/images/clapperboard.png'} style={{width: "13em"}} alt="clapperboard"/>
        <h3 className="WatchDiarySubTitle" style={{marginTop:"0"}}>Made for all movie lovers.</h3>
      </div>
    </div>
    <div style={{width: isBrowser ? "30%" : "90%", margin: "auto"}}>
      <GoogleLoginButton
        onClick={handleClick}
        style={{backgroundColor: "black", fontFamily: "Nerko One", margin: "auto"}}
        activeStyle={{backgroundColor: "#092e6b"}}
      />
    </div>
  </div>
}
