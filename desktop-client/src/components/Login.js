import { GoogleLoginButton } from "react-social-login-buttons";

export default function Login() {
  return <div id="loginPageContainer">
    <center><div id="watchDiaryIntro">
      <h1 className="WatchDiaryTitle" style={{marginBottom: "0"}}>Watch Diary</h1>
      <div className="WatchDiarySubTitleWrapper">
        <img src={process.env.PUBLIC_URL + '/images/clapperboard.png'} style={{width: "13em"}} alt="clapperboard"/>
        <h3 className="WatchDiarySubTitle" style={{marginTop:"0"}}> Write your own watch diary. Let movies
        have a special place in your heart.</h3>
      </div>
    </div></center>
    <center><div id="loginButton">
      <GoogleLoginButton
        onClick={() => {
          window.open("/testRoutingUrl", "_self");
        }}
        style={{backgroundColor: "black", fontFamily: "Nerko One"}}
        activeStyle={{backgroundColor: "#092e6b"}}
      />
    </div></center>
  </div>
}
