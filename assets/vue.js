new Vue( {
    el: '#app',
    data () {
        return {
            icons_search: true,
            search: ''
        }
    },
    methods: {
        focuss () {
            this.icons_search = false;
            this.$refs.bar_search.focus();
        },
        blurr () {
            this.icons_search = true;
        },
        search_icons () {
            this.icons_search = !this.icons_search;
            if ( !this.icons_search )
                this.focuss();
        }
    },
    computed: {
        search_icon () {
            return this.icons_search ? 'fa-solid fa-magnifying-glass' : 'fa-solid fa-arrow-left';
        }
    }
} )