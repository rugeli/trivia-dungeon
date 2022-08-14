import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"


const Footer = () => {
  return ( 
    <footer className="footer">
      <div className="icons">
        <ul className="social-list">
          <li className="social-list-item">
          <a href="mailto:rugeli0605@hotmail.com">
            <FontAwesomeIcon icon={faEnvelope} ></FontAwesomeIcon>{""}{""}
          </a>
          </li>
          <li className="social-list-item">
          <a href="https://github.com/rugeli/">
            <FontAwesomeIcon icon={faGithub}  ></FontAwesomeIcon>{""}{""}
          </a>
          </li>
          <li className="social-list-item">
          <a href="https://www.linkedin.com/in/ruge-li-505445240//">
          <FontAwesomeIcon icon={faLinkedin} ></FontAwesomeIcon> 
          </a>
          </li>
        </ul>
      </div>
      <p>Developed by Ruge</p>
    </footer>
  );
}

export default Footer;