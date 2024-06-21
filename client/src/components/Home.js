import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import logonu from "../assets/logoNu.png";
import Navbar from './Navbar';
import '../styles.css';

const Home = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["แบบประเมินองค์กรปกครองส่วนท้องถิ่น", "แบบประเมินสถานศึกษา"];
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;
  const [logoIndex, setLogoIndex] = useState(0); // 0 for logo, 1 for logonu
  const logos = [logo, logonu];

  useEffect(() => {
    let textTicker = setInterval(() => {
      tick();
    }, delta);
    return () => clearInterval(textTicker);
  }, [text, delta]);

  useEffect(() => {
    let logoTicker = setInterval(() => {
      setLogoIndex(prevIndex => (prevIndex + 1) % logos.length);
    }, 3000); // Change logo every 3 seconds
    return () => clearInterval(logoTicker);
  }, []);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(50);
    }
  };

  return (
    <div className="hm-container">
      <div className="hm-header">
        <Navbar />
      </div>
      <div className="hm-body">
        <section className="banner" id="home">
          <div className="banner-container">
            <div className="banner-image">
              <img src={logos[logoIndex]} alt="Header Img" className={logoIndex === 1 ? 'logonu' : 'logo'} />
            </div>
            <div className="banner-text">
              <h1>{`โครงการอนุรักษ์พันธุกรรมพืชอันเนื่องมาจากพระราชดำริ`}<br /></h1>
              <h1 >{`สมเด็จพระเทพรัตนราชสุดาฯ สยามบรมราชกุมารี (อพ.สธ.)`}<br /> <span className="wrap">{text}</span></h1>
            </div>
          </div>
        </section>
      </div>
      <div className="hm-footer">
        {/* Add footer content here if needed */}
      </div>
    </div>
  );
};

export default Home;
