const appId = 'dde7350d-cc80-4a05-abd8-f9b38d47f0f4';
const appSecret = '6509d5ba73f09bc90884cbdde850b5884167e2fe0c7ce02e8aa60592ee8b80b15e606316c02a21ef04206d048aeccffffd5b937004c199111720042b90a62990ffa480ac7aab0102d31a9a253d3d0e87b4c0667756791ad88428fe4b4074915269205c39d493bee8ded062334449e870';

async function getMoonPhases() {
    const url = 'https://api.astronomyapi.com/api/v2/studio/moon-phase';

    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Authorization': `Basic ${btoa(`${appId}:${appSecret}`)}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok'); 
        }

        const data = await response.json();
        displayMoonPhases(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function getMoonPhaseImage() {
    const dateInput = document.getElementById('date-input').value;
    if (!dateInput) {
        alert('Please select a date.');
        return;
    }

    const url = 'https://api.astronomyapi.com/api/v2/studio/moon-phase';
    const body = {
        format: "png",
        style: {
            moonStyle: "sketch",
            backgroundStyle: "stars",
            backgroundColor: "red",
            headingColor: "white",
            textColor: "red"
        },
        observer: {
            latitude: 6.56774,
            longitude: 79.88956,
            date: dateInput
        },
        view: {
            type: "portrait-simple",
            orientation: "south-up"
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(`${appId}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok'); 
        }

        const data = await response.json();
        displayMoonPhaseImage(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayMoonPhases(data) {
    const phases = data.data.phenomena.next;
    const moonPhaseContainer = document.getElementById('moon-phases-list');

    phases.forEach(phase => {
        const phaseElement = document.createElement('div');
        phaseElement.innerHTML = `
            <p><strong>${phase.name}</strong></p>
            <p>Date: ${new Date(phase.date).toDateString()}</p>
            <p>Phase: ${phase.phase}</p>
        `;
        moonPhaseContainer.appendChild(phaseElement);
    });
}

function displayMoonPhaseImage(data) {
    const imageUrl = data.data.imageUrl;
    const moonPhaseImageContainer = document.getElementById('moon-phase-image');

    moonPhaseImageContainer.innerHTML = ''; // Clear previous image
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Moon Phase Image';
    moonPhaseImageContainer.appendChild(imgElement);
}

getMoonPhases();
