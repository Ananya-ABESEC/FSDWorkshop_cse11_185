const projects = [
  {
    title: "Sweet Shop Website",
    desc: "Responsive React Website"
  },
  {
    title: "CGPA Calculator",
    desc: "C++ Project"
  },
  {
    title: "Portfolio Website",
    desc: "React + CSS"
  }
];

function Projects() {
  return (
    <section id="projects" className="section">

      <h2>Projects</h2>

      <div className="projects">

        {projects.map((project, index) => (
          <div className="project-card" key={index}>

            <h3>{project.title}</h3>

            <p>{project.desc}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Projects;