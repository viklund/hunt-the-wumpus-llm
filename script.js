
document.addEventListener('DOMContentLoaded', (event) => {
    const map = [
        [1, 4, 7], [0, 2, 9], [1, 3, 11], [2, 4, 13], [0, 3, 5], [4, 6, 14], 
        [5, 7, 16], [0, 6, 8], [7, 9, 17], [1, 8, 10], [9, 11, 18], [2, 10, 12],
        [11, 13, 19], [3, 12, 14], [5, 13, 15], [14, 16, 19], [6, 15, 17], 
        [8, 16, 18], [10, 17, 19], [12, 15, 18]
    ];

    const hazards = {
        wumpus: getRandomRoom(),
        pits: [getRandomRoom(), getRandomRoom()],
        bats: [getRandomRoom(), getRandomRoom()]
    };

    let playerPosition = getRandomRoom();
    let arrows = 5;

    function getRandomRoom() {
        return Math.floor(Math.random() * 20);
    }

    function updateWarnings() {
        const warnings = [];
        if (map[playerPosition].includes(hazards.wumpus)) warnings.push("You smell a terrible stench.");
        hazards.pits.forEach(pit => {
            if (map[playerPosition].includes(pit)) warnings.push("You feel a cold wind blowing from a nearby cavern.");
        });
        hazards.bats.forEach(bat => {
            if (map[playerPosition].includes(bat)) warnings.push("You hear a rustling.");
        });
        document.getElementById('warnings').innerText = warnings.join(' ');
    }

    function updateMap() {
        const mapDiv = document.getElementById('map');
        mapDiv.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const roomDiv = document.createElement('div');
            roomDiv.classList.add('room');
            if (i === playerPosition) roomDiv.classList.add('current');
            roomDiv.innerText = i;
            roomDiv.dataset.room = i;
            mapDiv.appendChild(roomDiv);
        }
        document.getElementById('current-room').innerText = playerPosition;
    }

    function movePlayer() {
        const newRoom = prompt("Enter room number to move to (0-19):");
        const newRoomNum = parseInt(newRoom);
        if (map[playerPosition].includes(newRoomNum)) {
            playerPosition = newRoomNum;
            checkCurrentRoom();
            updateMap();
        } else {
            alert("Invalid move. Try again.");
        }
    }

    function shootArrow() {
        const targetRoom = prompt("Enter room number to shoot arrow into (0-19):");
        const targetRoomNum = parseInt(targetRoom);
        if (map[playerPosition].includes(targetRoomNum)) {
            arrows--;
            if (targetRoomNum === hazards.wumpus) {
                alert("You killed the Wumpus! You win!");
            } else {
                alert("Missed! The Wumpus is still alive.");
                if (arrows === 0) {
                    alert("Out of arrows! Game over.");
                }
            }
        } else {
            alert("Invalid shot. Try again.");
        }
    }

    function checkCurrentRoom() {
        if (playerPosition === hazards.wumpus) {
            alert("You have been eaten by the Wumpus! Game over.");
        } else if (hazards.pits.includes(playerPosition)) {
            alert("You fell into a pit! Game over.");
        } else if (hazards.bats.includes(playerPosition)) {
            alert("A bat has taken you to a random room!");
            playerPosition = getRandomRoom();
            checkCurrentRoom();
        } else {
            updateWarnings();
        }
    }

    document.getElementById('move').addEventListener('click', movePlayer);
    document.getElementById('shoot').addEventListener('click', shootArrow);

    updateWarnings();
    updateMap();
});
