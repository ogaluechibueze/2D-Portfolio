import CameraController from "./reactComponents/CameraController";
import SocialModal from "./reactComponents/SocialModal";
import EmailModal from "./reactComponents/EmailModal";
import ProjectModal from "./reactComponents/ProjectModal";

export default function ReactUI() {
  return (
    <>
       <div className="controls-message">
      <p className="">Tap/Click around to move</p>
      <img src="genius.png" alt="GeniusWorld" width="200px" height="200px"/>
      </div>
      <CameraController />
      <SocialModal />
      <EmailModal />
      <ProjectModal />
    </>
  );
}
