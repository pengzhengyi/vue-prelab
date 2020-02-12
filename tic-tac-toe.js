// this is how to create a component that is globally registered
Vue.component('game-title', {
    template: `
        <h1>
            <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">Tic Tac Toe</a>
        </h1>
    `,
});

Vue.component('welcome-message', {
    props: {
        'message': String,
        'playerNames': {
            type: Array,
            default: () => [],
        }
    },
    computed: {
        // a computed getter
        messageToPlayers() {
            // `this` points to the vm instance
            if (this.playerNames.length) {
                return `${this.message} ${this.playerNames.join(', ')}`;   
            } else {
                return this.message;
            }
        }
    },
    template: `
        <p>
          {{ messageToPlayers }}
        </p>
    `,
});

Vue.component('ready-checkbox', {
    props: {
        'name': String,
    },
    data: function() {
        const id = `ready-switch-for-${this.name}`;
        return {
            checked: false,  
            id
        };
    },
    methods: {
        onClick(event) {
            this.checked = event.target.checked;
            this.$emit('player-ready', this.name, this.checked);
        }
    },
    template: `
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" :id="id" :checked="checked" @click="onClick">
            <label class="custom-control-label" :for="id">{{name}}, are you ready?</label>
        </div>
    `,
});

Vue.component('game-board', {
    data: function() {
        return {
            classObject: ['container', 'm-auto', 'bg-light', 'd-flex', 'flex-column'],
            styleObject: { 
                'width': '900px', 
                'height': '900px' 
            },
            boardRowClasses: ['board-row', 'row', 'flex-grow-1'],
            boardCellClasses: ['board-cell', 'col', 'p-4', 'border', 'border-primary', 'rounded-lg'],
        };
    },
    methods: {
        boardRowKey(r) {
            return `row-${r}`;
        },
        boardCellKey(r, c) {
            return `cell-${r}-${c}`;
        }
    },
    template: `
        <div id="board" :class="classObject" :style="styleObject">
            <div v-for="r of 3" :key="boardRowKey(r)" :class="boardRowClasses">
                <div
                    v-for="c of 3"
                    :key="boardCellKey(r, c)"
                    :id="(r - 1) * 3 + c"
                    :class="[{'bg-white': [2, 4, 6, 8].includes((r - 1) * 3 + c)} ,boardCellClasses]">
                </div>
            </div>
        </div>
    `
});

const app = new Vue({
    el: '#app',
    data: {
        message: 'Welcome to the game!',
        playerNames: [],
        appClasses: ['w-100', 'h-100', 'p-5', 'd-flex', 'flex-column', 'align-items-center'],
        playerReady: {}
    },
    methods: {
        onPlayerReady(playerName, isReady) {
            this.$set(this.playerReady, playerName, isReady);
        }
    },
    computed: {
        bothPlayerReady() {
            return this.playerNames.length && 
                this.playerNames.map(playerName => this.playerReady[playerName])
                                .reduce((prevValue, currValue) => prevValue && currValue);
        }
    }
});
                

window.setTimeout(() => {
    app.message = 'Ready to get started?';
    app.playerNames.push('Alice', 'Bob');
}, 1000);