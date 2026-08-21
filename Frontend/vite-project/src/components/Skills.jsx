const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "SQL",
  "Git",
  "C++"
];

function Skills() {
  return (
    <section id="skills" className="section">

      <h2>Skills</h2>

      <div className="skills">

        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            {skill}
          </div>
        ))}

      </div>

    </section>
  );
}

export default Skills;