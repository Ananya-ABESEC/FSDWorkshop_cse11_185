import profile from "../assets/profile.jpg";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-text">
        <h3>Hello, I'm</h3>
        <h1>Ananya Chaba</h1>

        <h2>Frontend Developer</h2>

        <p>
          I build responsive and beautiful websites using
          HTML, CSS, JavaScript and React.
        </p>

        <button>Download Resume</button>
      </div>

      <div className="hero-image">
        <img src={profile} alt="Profile" />
      </div>

    </section>
  );
}

export default Hero;