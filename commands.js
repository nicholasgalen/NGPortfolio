function getCurrentCoords() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported"));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            pos => resolve({ 
                lat: pos.coords.latitude, 
                lon: pos.coords.longitude 
            }),
            (error) => reject(new Error("Allow location access"))
        );
    });
}

function fetchWeather(coords) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${CONFIG.WEATHER_API_KEY}`
    )
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    })
    .then(data => {
        if (data.cod !== 200) throw new Error(data.message || "Unknown error");
        return formatWeather(data);
    });
}

function formatWeather(data) {
    const location = data.name || "Current Location";
    return `
        🌍 ${location}
        🌡️ Temp: ${Math.round(data.main.temp)}°C
        💨 Wind: ${data.wind.speed} m/s
        💧 Humidity: ${data.main.humidity}%
        ${data.weather[0]?.description || ''}
    `;
}

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
            weather  - Weather info
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
    },
    weather: {
        desc: "Show weather info",
        execute: () => {
            return new Promise((resolve) => {
                getCurrentCoords()
                    .then(coords => {
                        return fetchWeather(coords)
                            .then(weather => resolve(weather))
                            .catch(error => resolve(`🌩️ API Error: ${error.message}`));
                    })
                    .catch(error => resolve(`📍 ${error.message}`));
            });
        }
    }
};