import CameraController from "./reactComponents/CameraController";
import SocialModal from "./reactComponents/SocialModal";
import EmailModal from "./reactComponents/EmailModal";
import ProjectModal from "./reactComponents/ProjectModal";

export default function ReactUI() {
  return (
    <>
       <div className="controls-message">
        <div>
      <p className="">Tap or Click around to move</p>
      <p>Move to the black dot to <br/> open the project website</p>
      </div>
      <img src="logo4.png" alt="GeniusWorld" width="100px" height="60px"/>
      </div>
      <CameraController />
      <SocialModal />
      <EmailModal />
      <ProjectModal />
    </>
  );
}
