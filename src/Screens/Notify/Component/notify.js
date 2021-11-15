import React, { useState, useEffect } from 'react';
import Header from '../../Common/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
const NotifyScreen = (props) => {

  const [menuShow, setMenushow] = useState(false);

  const handleSidebar = () => {
    setMenushow(!menuShow)
  }

  useEffect(() => {
    startBasicCall();
  }, [])

  const rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };

  const options = {
    // Pass your app ID here.
    appId: "b13f7540466747e6a102327255673a59",
    // Set the channel name.
    channel: "itinfo",
    // Pass a token if your project enables the App Certificate.
    //token:null,
    token: "006b13f7540466747e6a102327255673a59IADCn4JugGkyNEFSZ0I+gY0FYpJvhmWSFW+jOAo38JyDtHVXpngAAAAAEABr21wCZLeQYQEAAQBkt5Bh",
  };


  async function startBasicCall() {
    /**
    *
    *
    * Put the following code snippets here.
    */
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
    const uid = await rtc.client.join(options.appId, options.channel, options.token, null);
    // Create an audio track from the audio sampled by a microphone.
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a video track from the video captured by a camera.
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Publish the local audio and video tracks to the channel.
    var d = await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    console.log("publish success!", d);

    const remoteVideoTrack = rtc.localVideoTrack;
    const playerContainer = document.getElementById("player");
    // Specify the ID of the DIV container. You can use the `uid` of the remote user.
    playerContainer.style.width = "640px";
    playerContainer.style.height = "480px";
    remoteVideoTrack.play(playerContainer);
    rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to a remote user.
      await rtc.client.subscribe(user, mediaType);

      console.log("user",user)
      // If the subscribed track is video.
      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;
        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const playerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the `uid` of the remote user.
        playerContainer.id = user.uid.toString();
        playerContainer.style.width = "0px";
        playerContainer.style.height = "0px";
        document.body.append(playerContainer);
        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(playerContainer);
        props.setonline(true);

        // Or just pass the ID of the DIV container.
        // remoteVideoTrack.play(playerContainer.id);
      }

      // If the subscribed track is audio.
      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
    });

  }







  return (
    <>
      <Header handleSidebar={handleSidebar} menuShow={menuShow} />
      {menuShow ?
        <Sidebar /> : null}
      <div>

        <section className="branch-area ">
          <div className="container ">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="branch-content main_page branch_ld_content mt-4">
                  <div className="branch-img-box p-3" id="player">
                    {/* {/ <img src="/assets / images / bank.jpg" className="branch--img" /> /} */}
                  </div>
                  <div>
                    {/* <button href="#" className="brnc--call-btn">Auditor Will Start The Call</button> */}
                  </div>
                  {props.auditStart && props.question ? <section>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div className="branch-img-box p-3">
                              <p className="cll-img--hading">{props.question.audit_question}</p>
                              {props.question.image_capture == 1 ?
                                <img src={props.imgurl + props.question.image_taken} className="branch--img" />
                                : null}

                            </div>
                            <div className="call--rating-box">
                              <form>
                                {
                                  props.question.score_range == 1 ?
                                    <div className="rating-text">
                                      <label className="form-title">Rating: <span>{props.question.rating}</span></label>
                                    </div> : null
                                }
                                {/* <div className="form-group">
                                  <label className="form-title">Actionable</label>
                                  <select className="form-control select--action-bh">
                                    <option className>BH/RMM/AC</option>
                                    <option className>BH/RMM/AC</option>
                                    <option className>BH/RMM/AC</option>
                                  </select>
                                </div> */}
                                 {
                                  props.question.remark == 1 ?
                                <div className="form-group">
                                  <label className="form-title">Remarks</label>
                                  <textarea className="form-control call--remarks" value={props.question.question_remark} rows={3} defaultValue={""} />
                                </div>
                                : null
                              }
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section> :
                    <div className="main--titile-box">
                      <h4 className="call--title">HDFC Team ready for the call :</h4>
                      <div className="bnc-fom-listing-box">
                        <ul className="bnc-fom-list-menu">
                          <li className="bnc-fom-link"><span>Branch Manager Name(You)</span><small className="text-success">Joined</small> </li>
                          <li className="bnc-fom-link"><span>RMM</span><small><a className="cl-ofline--btn" href="#">{props.online?"Online":"Offline"}</a> </small> </li>
                          {/* <li className="bnc-fom-link"><span>RMM</span><small><a className="cl-ofline--btn" href="#">{props.online?"Online":"Offline"}</a> <a href className="notif-btn">Notify</a> </small> </li> */}
                          {/* <li className="bnc-fom-link"><span>Admin Name</span > <small className="text-success">Joined</small> </li> /} */}
                        </ul>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default NotifyScreen;