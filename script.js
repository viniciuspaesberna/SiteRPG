Modal = {
    on_off() {
        document.querySelector('.modal-overlay').classList.toggle('active')
    }
}

PlayersList = [
    {
        nick: 'Antohn Pyotr',
        hp: 8,
        ficha: 'Ficha_Oficial_DD_Antohn_Pyotr.pdf'
    },
    {
        nick: 'Castian Arcwin',
        hp: 6,
        ficha: 'Ficha_da_giovana.pdf'
    },
    {
        nick: 'Kuron Aystelin',
        hp: 10,
        ficha: 'Nova_ficha_do_mupy.pdf'
    },
    {
        nick: 'Luttrell Vallandras',
        hp: 12,
        ficha: 'Ficha_Mateus.pdf'
    },
    {
        nick: 'Yspítha',
        hp: 6,
        ficha: 'Ficha_do_Yan.pdf'
    },
]

FormPlayer = {
    nick: document.querySelector('input#name'),
    hp: document.querySelector('input#hp'),
    // ficha: document.querySelector('.player-form input#ficha'),

    getValues() {
        return {
            nick: FormPlayer.nick.value,
            hp: FormPlayer.hp.value,

            // ficha: FormPlayer.ficha.files
        }
    },

    clearFields() {
        FormPlayer.nick.value = ""
        FormPlayer.hp.value = ""
        // FormPlayer.ficha.files = null
    },

    submit(event) {
        event.preventDefault()
        try {
            const player = FormPlayer.getValues()
            Player.addPlayer(player)
            FormPlayer.clearFields()
            Modal.on_off()
        } catch (error) {
            alert(error.message)
        }
    }
}

const Player = {
    playerContainer: document.getElementById('players'),
    divFicha: document.querySelector('.ficha'),
    FichasPlayers: [],

    addPlayer(player) {
        PlayersList.push({ nick: player.nick, hp: player.hp })

        App.reload()
    },

    showPlayer(player) {
        const divPlayer = document.createElement('div')
        divPlayer.classList.add('player')
        divPlayer.innerHTML = Player.innerHTMLPlayer(player)

        Player.playerContainer.appendChild(divPlayer)
    },

    innerHTMLPlayer(player) {
        const htmlplayer = `
            <div class="player">
                <div class="playerInfo">
                     <h3>${player.nick}</h3>
                     <div class="status">
                         <div>
                            <p>Vida:<input type="number" id="hp" value="${player.hp}"></p>
                        </div>             
                        <span>
                            <img onclick="Player.showFichaPlayer('${player.ficha}')" src="https://img.icons8.com/pastel-glyph/32/ffffff/regular-document--v2.png"/>
                        </span>
                    </div>
                </div>  
            </div>
        `
        return htmlplayer
    },

    clearPlayers() {
        Player.playerContainer.innerHTML = ""
    },

    showFichaPlayer(fichaName){
        Player.clearFicha()
        const aside = document.querySelector('aside')
        const main = document.querySelector('main')
    
        Player.divFicha.innerHTML = Player.innerHTMLFicha(fichaName)

        main.insertBefore(Player.divFicha, aside)
    },

    innerHTMLFicha(fichaName){
        htmlficha = `
        <embed src="./assets/Fichas/${fichaName}" type="application/pdf" width="100%" height="100%">
        `
        return htmlficha
    },

    clearFicha(){
        Player.divFicha.innerHTML = ""
    },

}

const quickDices = {
    quickDice(size) {
        Dice.clearDiceValues()
        p = document.createElement('p')
        value = Dice.roll(size)
        p.innerHTML = `${value}`
        Dice.result.appendChild(p)
    },

    d4() {
        quickDices.quickDice(4)
    },
    d6() {
        quickDices.quickDice(6)
    },
    d8() {
        quickDices.quickDice(8)
    },
    d10() {
        quickDices.quickDice(10)
    },
    d12() {
        quickDices.quickDice(12)
    },
    d20() {
        quickDices.quickDice(20)
    },


}

const Dice = {
    result: document.getElementById('result'),

    roll(size) {
        return Number(Math.floor(Math.random() * (size) + 1))
    },

    showDiceValue() {
        const size = document.getElementById('sizeDices').value
        const amount = document.getElementById('amountDices').value

        Dice.clearDiceValues()
        for (let i = 0; i < amount; i++) {
            p = document.createElement('p')
            value = Dice.roll(size)
            p.innerHTML = `${value}`
            Dice.result.appendChild(p)
        }
    },

    clearDiceValues() {
        Dice.result.innerHTML = ""
    },

    soundDices() {
        const audio = new Audio('./assets/sound_effects/dados.mp3')
        audio.play()
    }
}

const App = {
    init() {
        PlayersList.forEach((player) => {
            Player.showPlayer(player)

        })
    },

    reload() {
        Player.clearPlayers()
        App.init()
    }
}

App.init()