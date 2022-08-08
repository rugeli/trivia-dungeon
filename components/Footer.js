import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"


const Footer = () => {
  return ( 
    <footer>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 fa-2x">
        <div className="flex" text-6xl></div>
        <FontAwesomeIcon icon={faEnvelope} className= "hover:text-red-500"></FontAwesomeIcon>{""}{""}
        <FontAwesomeIcon icon={faGithub} className= "hover:text-gray-500"></FontAwesomeIcon>{""}{""}
        <FontAwesomeIcon icon={faLinkedin} className= "hover:text-blue-500"></FontAwesomeIcon> 
      </div>
      Developed by Ruge
    </footer>
  );
}

export default Footer;