new Vue( {
    el: '#app',
    data () {
        return {
            icons_search: true,
            search: ''
        }
    },
    methods: {
        axchange_icons () {
            if ( this.icons_search === false )
                this.search = '';
            
            this.icons_search = !this.icons_search;
        }
    },
    computed: {
        search_icon () {
            return this.icons_search ? 'fa-solid fa-magnifying-glass' : 'fa-solid fa-arrow-left';
        }
    }
})