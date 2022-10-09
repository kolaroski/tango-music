import './Footer.css';

const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      <p className="footer-text">TANGO MUSIC PROJECT</p>
      <a
        className="contact-link"
        href="https://github.com/kolaroski/tango-music"
        target="blank"
      >
        <img
          src={require('../assets/img/GitHub-Mark-Light-120px-plus.png')}
          alt="github"
          height={30}
        />
      </a>
    </div>
  );
};

export default Footer;
