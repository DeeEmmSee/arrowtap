var socket = null;

var arrowGame = Vue.component('arrowgame', {
    props: ['seed'],
    data: function() {
        return {
            steps: 0,
            currentStep: 0,
            score: 0,
            timer: '0:00:000',
            currentSequence: [],
            userSequence: [],
            sequences: [],
            state: 0
        }
    },
    methods: {
        Start: function() {
            if (this.state != 1) {
                this.score = 0;
                this.GetNextSequence(true);
                this.state = 1;
            }
        },
        Retry: function() {
            // Reset seed
            this.props.seed = GenerateSeed(10);
            this.Start();
        },
        GetNextSequence: function(isStart) {
            if (isStart) {
                this.currentStep = 0;
            }
            else {
                this.currentStep++;
            }

            if (this.currentStep < this.sequences.length) {
                this.currentSequence = this.sequences[this.currentStep];
            }
        },
        CheckKeyPress: function() {
            var has1Wrong = false;

            for (var i = 0; i < this.userSequence.length; i++) {
                var cur = this.currentSequence.substr(i, 1);
                var key = this.userSequence[i].key;

                if ((key == 1 && (cur == 0 || cur == 4)) ||
                    (key == 2 && (cur == 1 || cur == 5)) ||
                    (key == 3 && (cur == 2 || cur == 6)) ||
                    (key == 4 && (cur == 3 || cur == 7))) {
                        // Correct
                        this.userSequence[i].class = 'right';
                        console.log('YES');
                }
                else {
                    // Incorrect
                    this.userSequence[i].class = 'wrong';
                    has1Wrong = true;
                    console.log('NO');
                    break;
                }
            }

            if (!has1Wrong) {
                // This doesn't reset userSequence
                if (this.currentSequence.length == this.userSequence.length) {
                    this.score++;
                    this.GetNextSequence(false);
                    this.userSequence = [];
                }
            }
            else {
                this.userSequence = [];
            }

            if (this.currentStep >= this.sequences.length) {
                // End
                this.state = 2;
            }
        },
        KeyUpPress: function() {
            this.userSequence.push({key: 1, class: ''});
            if (this.state == 1) {
                this.CheckKeyPress();
            }
        },
        KeyDownPress: function() {
            this.userSequence.push({key: 2, class: ''});
            if (this.state == 1) {
                this.CheckKeyPress();
            }
        },
        KeyLeftPress: function() {
            this.userSequence.push({key: 3, class: ''});
            if (this.state == 1) {
                this.CheckKeyPress();
            }
        },
        KeyRightPress: function() {
            this.userSequence.push({key: 4, class: ''});
            if (this.state == 1) {
                this.CheckKeyPress();
            }
        }
    },
    computed: {
    },
    watch: {
        seed: {
            immediate: true,
            handler (newVal, oldVal) {
                if (newVal != undefined && newVal != '' && oldVal != newVal){
                    // Generate
                    var l = 0;
                    var i = 1;
                    while (l < newVal.length) {
                        var s = newVal.substr(l, i);
                        this.sequences.push(s);
                        l += i;
                        i++;
                    }
                    
                    if (this.sequences.length > 0) {
                        this.steps = this.sequences.length;
                        this.currentSequence = this.sequences[0];
                    }
                }
            }
        }
    },
    created: function() {
       
    },
    mounted: function() {
        
    },
    template: '<div class="col-sm-6" style="border: solid 2px red; text-align: center;">' + 
                //'Seed: {{ seed }}<br />' + 
                '<div class="row"><div class="col-sm-12"><img src="https://via.placeholder.com/128x128.png"/></div></div>' +
                '<div class="row"><div class="col-sm-6" v-if="">Score: {{ score }}</div><div class="col-sm-6" v-if="">{{ timer }}</div></div>' +
                '<div class="row" v-on:click="Start()" @keyup.up="KeyUpPress" @keyup.down="KeyDownPress" @keyup.left="KeyLeftPress" @keyup.right="KeyRightPress">' +
                    '<div class="col-sm-12" tabindex="0">' +
                        '<span v-if="state == 0">Click here to begin</span>' +
                        '<span style="float:left; font-size:48px;" v-for="(k, idx) in currentSequence" v-if="state == 1" v-bind:class="idx < userSequence.length ? userSequence[idx].class : \'\'">' +
                        '{{ (k == 0 || k == 4 ? "&uarr;" : (k == 1 || k == 5 ? "&darr;" : (k == 2 || k == 6 ? "&larr;" : k == 3 || k == 7 ? "&rarr;" : "")))}}' +
                        '</span>' +
                        '<span v-if="state == 2" v-on:click="Retry()">Game Over!<br />Click here to play again</span>' +
                    '</div>'+
                '</div>' +
              '</div>'
});

/*var vue_game = new Vue({
    el: '#vue_game',
    data: {
        seed: ""
    },
    methods: {
        GetBounties: function() {
            
        },
        GenerateSeed: function(steps){
            var result = "";
            var taps = 0;
        
            for (var i = 1; i <= steps; i++) {
                taps += i
            }
        
            for (var i = 0; i < taps; i++) {
                var num = Math.floor(Math.random() * 10);  // between 0 and 9
                result = result + num;
            }
            
            return result;
        }
    },
    computed: {
    },
    watch: {
    },
    created: function() {
        vue_game.seed = vue_game.GenerateSeed(10);
    },
    mounted: function() {
        
    }
});*/
