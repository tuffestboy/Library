//=================================
// gegevens voor api call
//=================================

//client id en secret (om de acces token te krijgen)
const clientId = "7853e904d11147658a00379a3416de13";
const clientSecret = "50f85a2abe0a46cbb2a6dc5c3cd2b6e1";


//=================================
// functies
//=================================

//acces token aanvragen
async function getAccessToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
  });

  const data = await result.json();
  return data.access_token; 
}


//functie voor reload knop (om opnieuw te fetchen)
function herlaadKnop(container, func, ID) {
    container.innerHTML = ""; 
    func(ID, container); 
}


//functie om herlaad playlist aan een knop te binden
function addReload(Place, func, ID){
    const reLoadButton = Place.querySelector('.reload');
    reLoadButton.addEventListener('click', () => herlaadKnop(Place, func, ID))
}


//Functie om tracks van een artiest op te halen
async function haalNummersOp(artistID, container) {
    try{
        const token = await getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=NL`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json(); 
        if(data.tracks && data.tracks.length > 0){
            data.tracks.sort((a, b) => b.popularity - a.popularity);
            console.log(data.tracks);

            return data.tracks;
        }
        else{
            container.insertAdjacentHTML("beforeend", `
                <div class="col-12 mb-4 d-flex align-items-center flex-column">
                    <h2 class="text-center text-danger fs-2">kon geen nummers vinden :(</h2>
                    <button type="button" class="btn btn-outline-danger w-50 fs-3 px-5 py-3 mt-3 reload">
                        opnieuw proberen?
                    </button>
                </div>
            `)
            addReload(container, haalNummersOp, artistID);
        }
    }
    catch(error){
        container.insertAdjacentHTML("beforeend", `
            <div class="col-12 mb-4 d-flex align-items-center flex-column">
                <h2 class="text-center text-danger fs-2">error: ${error} :(</h2>
                <button type="button" class="btn btn-outline-danger w-50 fs-3 px-5 py-3 mt-3 reload">
                    opnieuw proberen?
                </button>
            </div>
        `)
        addReload(container, haalNummersOp, artistID);
    }
}


//trending nummers uit een playlist halen en sorteren op popularitijd
async function zoekNums(playlistID, numPlace) {

    //maakt de container aan voor de load animatie
    const loader = document.createElement('div');
    loader.classList.add('col-12', 'mb-3', "row", "justify-content-center", "align-items-center", "gap-5");
    loader.innerHTML = `
        <div class="loading d-flex justify-content-center align-items-center"><p>Loading...</p></div>
        <div class="loading d-flex justify-content-center align-items-center"><p>Loading...</p></div>
        <div class="loading d-flex justify-content-center align-items-center"><p>Loading...</p></div>
    `;
    numPlace.appendChild(loader);

    //probeer playlists te zoeken en nummers er uit te filteren(hoog > laag)
    try{
        const token = await getAccessToken();
        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        const data = await result.json();
        console.log(data);
            
        if (data.items && data.items.length > 0) {
            
            let tracks = data.items
                .map(item => item.track)
                .filter(track => track !== null);

            //sorteren op popularitijd hoog > laag
            tracks.sort((a, b) => b.popularity - a.popularity);

            //hoogste 10 pakken en op het scherm zetten
            const top10Tracks = tracks.slice(0, 10);

            //itereert door elke track > 10 en zet dat op de pagina
            let numCon = ""
            top10Tracks.forEach((track, index)  => {
                numCon += `
                    <div class="col-lg-4 mb-4">
                        <div class="card bg-secondary h-100">
                            
                            <div class="card-body d-flex flex-column">
                                <h2 class="fw-bold">Top hit: ${index + 1}</h2>

                                <div class="marquee-container fw-bold fs-5 mb-2" title="${track.name}" style="color: darkblue">
                                    <span class="marquee-content">
                                        ${track.name} 
                                    </span>
                                </div>
                                
                                <div class="ratio ratio-1x1 mb-3">
                                    <img class="img-fluid rounded object-fit-cover" 
                                        src="${track.album.images[0]?.url}" 
                                        alt="${track.name}">
                                </div>

                                <div class="mb-1">
                                    <iframe style="border-radius:12px" 
                                            src="https://open.spotify.com/embed/track/${track.id}?utm_source=generator" 
                                            width="100%" 
                                            height="80" 
                                            frameBorder="0" 
                                            allowfullscreen="" 
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                            loading="lazy">
                                    </iframe>
                                </div>
                                
                                <p class="fs-5 text-white mb-1">Artiest: ${track.artists[0].name}</p>
                                <p class="fs-6 text-light mt-2 text-center">Populariteit rating: ${track.popularity}</p>
                                
                            </div>
                        </div>
                    </div> 
                `;
            });
            numPlace.insertAdjacentHTML("beforeend", numCon);
        } 
        else{
            numPlace.insertAdjacentHTML("beforeend", `
                <div class="col-12 mb-4">
                    <h2 class="text-center text-danger fs-2">kon geen nummers vinden :(</h2>

                    <button type="button" class="btn btn-outline-danger px-5 py-3 mt-3 reload">
                        opnieuw proberen?
                    </button>
                </div>         
            `);
            addReload(numPlace, zoekNums, playlistID);
        }
    }
    catch(error){
        numPlace.insertAdjacentHTML("beforeend", `
            <div class="col-12 mb-4">
                <h2 class="text-center text-danger fs-2">Error: ${error} :(</h2>

                <button type="button" class="btn btn-outline-danger px-5 py-3 mt-3 reload">
                    opnieuw proberen?
                </button>
            </div>         
        `);
        addReload(numPlace, zoekNums, playlistID);
    }
    finally{
        loader.remove();
    }
}


async function zoekArtiest(artistID, artistPlace, imagePlace){
    //maakt de container aan voor de load animatie
    const loader = document.createElement('div');
    loader.classList.add('col-12', 'mb-3', "row", "justify-content-center", "align-items-center", "gap-5");
    loader.innerHTML = `
        <div class="loading d-flex justify-content-center align-items-center"><p>Loading...</p></div>
        <div class="loading d-flex justify-content-center align-items-center"><p>Loading...</p></div>
        <div class="loading d-flex justify-content-center align-items-center"><p>Loading...</p></div>
    `;
    artistPlace.appendChild(loader);

    try{
        const token = await getAccessToken();
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        const data = await result.json();
        console.log(data);

        if(data && data.name){
            let artiest = data
            let popArtTrack = await haalNummersOp(artistID, artistPlace);

            let artistcon = ""
            if(imagePlace == "left"){
                artistcon = `
                    <div class="col-12 col-md-6">
                        <img class="img-fluid rounded-3" 
                             src="${artiest.images['0']?.url}" 
                             alt="${artiest.name}">
                    </div>

                    <div class="col-12 col-md-6 text-center text-light mt-3 mt-md-0">
                        <h2 class="fs-1 fw-bold" title="${artiest.name}" style="color: darkblue;">${artiest.name}</h2>
                        <p class="fs-4 mt-3">popularitijds rating: <span class="fw-bold" style="color: darkblue;">${artiest.popularity}</span></p>
                        <p class="fs-4">volgers: <span class="fw-bold" style="color: darkblue;">${artiest.followers['total'].toLocaleString('nl-NL')}</span></p>
                        <p class="fs-4">genres:</p>
                        <p class="fs-4">
                            ${artiest.genres.map(genre => `
                                <span class="badge rounded-pill bg-light" style="color: darkblue;">${genre}</span>
                            `).join('')}
                        </p>

                        <div class="mt-5">
                            <h3 class="fs-3 text-center mb-4">meest populaire nummer van <span class="fw-bold" style="color: darkblue;">${artiest.name}</span></h3>
                            <h4 title="${popArtTrack['0'].name}" class="mb-3 fw-bold" style="color: darkred;">${popArtTrack['0'].name}</h4>
                            <iframe style="border-radius:12px" 
                                    src="https://open.spotify.com/embed/track/${popArtTrack['0'].id}?utm_source=generator" 
                                    width="75%" 
                                    height="80" 
                                    frameBorder="0" 
                                    allowfullscreen="" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                    loading="lazy">
                            </iframe>
                            <p class="fs-4">popularitijds rating: <span class="fw-bold" style="color: darkblue;">${popArtTrack['0'].popularity}</span></p>
                        </div>
                    </div>
                `
            }
            else{
                artistcon = `
                    <div class="col-12 col-md-6 text-center text-light mt-3 mt-md-0">
                        <h2 class="fs-1 fw-bold" title="${artiest.name}" style="color: darkblue;">${artiest.name}</h2>
                        <p class="fs-4 mt-3">popularitijds rating: <span class="fw-bold" style="color: darkblue;">${artiest.popularity}</span></p>
                        <p class="fs-4">volgers: <span class="fw-bold" style="color: darkblue;">${artiest.followers['total'].toLocaleString('nl-NL')}</span></p>
                        <p class="fs-4">genres:</p>
                        <p class="fs-4">
                            ${artiest.genres.map(genre => `
                                <span class="badge rounded-pill bg-light" style="color: darkblue;">${genre}</span>
                            `).join('')}
                        </p>

                        <div class="mt-5">
                            <h3 class="fs-3 text-center mb-4">meest populaire nummer van <span class="fw-bold" style="color: darkblue;">${artiest.name}</span></h3>
                            <h4 title="${popArtTrack['0'].name}" class="mb-3 fw-bold" style="color: darkred;">${popArtTrack['0'].name}</h4>
                            <iframe style="border-radius:12px" 
                                    src="https://open.spotify.com/embed/track/${popArtTrack['0'].id}?utm_source=generator" 
                                    width="75%" 
                                    height="80" 
                                    frameBorder="0" 
                                    allowfullscreen="" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                    loading="lazy">
                            </iframe>
                            <p class="fs-4">popularitijds rating: <span class="fw-bold" style="color: darkblue;">${popArtTrack['0'].popularity}</span></p>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 text-md-end">
                        <img class="img-fluid rounded-3" 
                             src="${artiest.images['0']?.url}" 
                             alt="${artiest.name}">
                    </div>
                `
            }

            artistPlace.insertAdjacentHTML("beforeend", artistcon);
        }
        else{
            artistPlace.insertAdjacentHTML("beforeend", `
                <div class="col-12 mb-4 d-flex align-items-center flex-column">
                    <h2 class="text-center text-danger fs-2">kon deze artiest niet vinden :(</h2>

                    <button type="button" class="btn btn-outline-danger w-50 fs-3 px-5 py-3 mt-3 reload">
                        opnieuw proberen?
                    </button>
                </div>         
            `);
            addReload(artistPlace, zoekArtiest, artistID);
        }
    }
    catch(error){
        artistPlace.insertAdjacentHTML("beforeend", `
            <div class="col-12 mb-4 d-flex align-items-center flex-column">
                <h2 class="text-center text-danger fs-2">Error: ${error} :(</h2>

                <button type="button" class="btn btn-outline-danger w-50 fs-3 px-5 py-3 mt-3 reload">
                    opnieuw proberen?
                </button>
            </div>          
            `)
            addReload(artistPlace, zoekArtiest, artistID,);
    }
    finally{
        loader.remove();

    }
}

async function voerZoekOpdrachtUit() {
    const inputVeld = document.getElementById('zoekInput');
    const container = document.getElementById('zoekResultaten');
    const zoekTerm = inputVeld.value;

    if (!zoekTerm) return; // Stop als veld leeg is

    //maakt de container aan voor de load animatie
    const loader = document.createElement('div');
    loader.classList.add('col-12', 'mb-3', "row", "justify-content-center", "align-items-center", "gap-5");
    loader.innerHTML = `
        <div class="text-center text-light col-12 fs-3"><p>Zoeken...</p></div>
        <div class="loading d-flex justify-content-center align-items-center"><p>Loading...</p></div>
        <div class="loading d-flex justify-content-center align-items-center"><p>Loading...</p></div>
        <div class="loading d-flex justify-content-center align-items-center"><p>Loading...</p></div>
    `;
    container.appendChild(loader);

    try {
        const token = await getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(zoekTerm)}&type=track&limit=9`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        const tracks = data.tracks.items;

        if (tracks.length === 0) {
            container.innerHTML = `<p class="text-center text-danger">Geen nummers gevonden voor "${zoekTerm}"</p>`;
            return;
        }

        let html = '';
        tracks.forEach(track => {
            html += `
                <div class="col-8 col-md-6 col-sm-8 mb-4">
                    <div class="card bg-secondary h-100 text-white border-0">
                        <div class="card-body d-flex flex-column">
                            <h2 class="card-title text-center fw-bold fs-3">${track.name}</h2>
                            <p class="card-text text-center text-light fw-bold">${track.artists[0].name}</p>
                        </div>

                        <img src="${track.album.images['0']?.url}" 
                             class="card-img-top p-3 rounded-5" 
                             alt="${track.name}">

                        <div class="mt-auto text-center mb-3">
                            <iframe style="border-radius:12px" 
                                    src="https://open.spotify.com/embed/track/${track.id}?utm_source=generator" 
                                    width="90%" 
                                    height="80" 
                                    frameBorder="0" 
                                    allowfullscreen="" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                    loading="lazy">
                            </iframe>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = ''
        container.insertAdjacentHTML("afterbegin", `
            <h2 class="text-center fw-bold mb-4">gevonden nummers:</h2>
        `)
        
        container.insertAdjacentHTML("beforeend", html)
    } 
    catch(error){
        console.error(error);
        container.innerHTML = `<p class="text-center text-danger">Er ging iets mis bij het zoeken.</p>`;
    }
    finally{
        loader.remove();
    }
}

//=================================
// functies aanroepen
//=================================

//=================================
// top nummers
//=================================

//top 100 kerst nummers nl
//74MCcW0dOTAVbshPVl3mUQ
const tracksToScreen = document.querySelector('.get-nums');
zoekNums(`74MCcW0dOTAVbshPVl3mUQ`,tracksToScreen);


//top 100 nederland
//1im044OopXyqsGbNu8Zqby
const tracksToScreen2 = document.querySelector('.get-nums-2');
zoekNums(`1im044OopXyqsGbNu8Zqby`,tracksToScreen2);


//top 100 mostb streamed spotify songs
//5ABHKGoOzxkaa28ttQV9sE
const tracksToScreen3 = document.querySelector('.get-nums-3');
zoekNums(`5ABHKGoOzxkaa28ttQV9sE`,tracksToScreen3);


//=================================
// top artiesten en hun top nummers
//=================================

//diddy
//59wfkuBoNyhDMQGCljbUbA
const artiest1 = document.querySelector(".artiest-1");
zoekArtiest("59wfkuBoNyhDMQGCljbUbA", artiest1, "left");


//marco borsato
//5quv5QEyL2XAloebaau69m"
const artiest2 = document.querySelector(".artiest-2");
zoekArtiest("3D2GUXbtlL3r2d5HJEnsFD", artiest2, "right");


//r kelly
//5quv5QEyL2XAloebaau69m
const artiest3 = document.querySelector(".artiest-3");
zoekArtiest("5quv5QEyL2XAloebaau69m", artiest3, "left");


//ali b
//2mxe0TnaNL039ysAj51xPQ
const artiest4 = document.querySelector(".artiest-4");
zoekArtiest("2mxe0TnaNL039ysAj51xPQ", artiest4, "right");


//bill cosby
//4JeqRr8Upw5uxLEu6jgIRm
const artiest5 = document.querySelector(".artiest-5");
zoekArtiest("4JeqRr8Upw5uxLEu6jgIRm", artiest5, "left");


//=================================
// nummers zoeken
//=================================
const zoekKnop = document.getElementById('zoekKnop');
const inputVeld = document.getElementById('zoekInput');

if(zoekKnop){
    zoekKnop.addEventListener('click', voerZoekOpdrachtUit);
}

if(inputVeld){
    inputVeld.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            voerZoekOpdrachtUit();
        }
    });
}


//=================================
// js animaties
//=================================

//confetti effect
const conBut = document.querySelector('.con-but');
conBut.addEventListener('click', () =>{
    confetti({
        particleCount: 500,
        spread: 150, 
        startVelocity: 45, 
        ticks: 200, 
        origin: { x: 1, y: 0.9 }, 
    });

    confetti({
        particleCount: 500,
        spread: 150,
        startVelocity: 45,
        ticks: 200,
        origin: { x: 0, y: 0.9 },
    });

});

