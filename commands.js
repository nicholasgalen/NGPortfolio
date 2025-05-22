const commands = {
    help: {
        desc: "List all commands",
        execute: () => `
            [AVAILABLE COMMANDS]

            help     - Show commands
            skills   - Technical skills
            projects - My projects
            contact  - Contact info
            clear    - Clean terminal
            about    - Portfolio info
        `
    },
    skills: {
        execute: () => `
            [TECH SKILLS]

            • Mobile: Android Studio | Kotlin/Java | Flutter/Dart | Spring Boot
            • Cloud: AWS | Firebase
            • IA/ML: Python
            • Game Dev: C#/.NET | Unity
            • Web: HTML | CSS | Node.js | PostgreSQL | Express | React | Javascript
            • Tools: Git | Docker | Jira
        `
    },
    projects: {
        execute: () => `
            [FEATURED PROJECTS]

            • CartButler - Shopping assistant
            • AR Furniture - Flutter AR app
            • BroStudy - Learning platform
        `
    },
    contact: {
        execute: () => `
            [CONTACT]

            📧 Email: galennicholas@proton.me
            💼 LinkedIn: linkedin.com/in/nicholas-galen
            👨💻 GitHub: github.com/nicholasgalen
        `
    },
    about: {
        execute: () => `
            [ABOUT]

            Passionate developer focused on
            mobile apps and innovative solutions.
            Currently exploring AI/ML integrations!
        `
    }
};