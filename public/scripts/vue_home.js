var vue_home = new Vue({
    el: '#vue_home',
    data: {
        gametype: 0,
        seed: '',
        strTest: "Teesting"
    },
    methods: {
        NewGame: function(type) {
            this.gametype = type;

            if (type == 1) {

            }
            else if (type == 2) {

            }            
        },
        KeyUpPress: function() {
            console.log("TEST");
        },
        ClearType: function() {
            this.gametype = 0;
        },
        SP_Time: function() {
            this.seed = GenerateSeed(10);
            console.log(this.seed);
        },
        SP_Survival: function() {
            this.seed = GenerateSeed(100);

        },
        MP_NewGame: function() {
            var code = this.GetRoomCode();
            window.location.href = "/game/" + code;
        },
        MP_JoinGame: function() {
            var code = this.GetRoomCode();
            window.location.href = "/game/" + code;
        },
        GetRoomCode: function() {
            var code = "ABCD";
            return code;
        }
    },
    components: {
        //arrowGame: arrowGame
    },
    computed: {
        // latestBounties: function() {
        //     return _.orderBy(this.bounties, 'added_on', 'desc');
        // },
        // latestClaims: function() {
        //     return _.orderBy(this.bounties, 'claimed_on', 'desc');
        // }
    },
    watch: {
    },
    created: function() {
    },
    mounted: function() {
    }
});

/*Vue.component('comp', {
    data: {

    },
    model: {
    },
    props: {
    },
    template: ''
});*/