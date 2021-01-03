import { GoogleLoginButton } from "react-social-login-buttons";

export default function Login() {
  function handleClick() {
    window.location.href = "/auth/google";
  }
  return <div id="loginPageContainer">
    <center><div id="watchDiaryIntro">
      <h1 className="WatchDiaryTitle" style={{marginBottom: "0"}}>Movelp</h1>
      <div className="WatchDiarySubTitleWrapper">
        <img src={process.env.PUBLIC_URL + '/images/clapperboard.png'} style={{width: "13em"}} alt="clapperboard"/>
        <h3 className="WatchDiarySubTitle" style={{marginTop:"0"}}>All in one platform for all movie lovers.</h3>
      </div>
    </div></center>
    <center><div id="loginButton">
      <GoogleLoginButton
        onClick={handleClick}
        style={{backgroundColor: "black", fontFamily: "Nerko One"}}
        activeStyle={{backgroundColor: "#092e6b"}}
      />
    </div></center>
  </div>
}
