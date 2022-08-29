const contacts = [
    {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent',
                drop_menu: 0
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent',
                drop_menu: 1
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received',
                drop_menu: 2
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent',
                drop_menu: 0
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received',
                drop_menu: 1
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent',
                drop_menu: 2
            }
        ],
    },
    {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received',
                drop_menu: 0
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent',
                drop_menu: 1
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received',
                drop_menu: 2
            }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent',
                drop_menu: 0
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received',
                drop_menu: 1
            }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent',
                drop_menu: 0
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received',
                drop_menu: 1
            }
        ],
    },
    {
        name: 'Claudia',
        avatar: '_6',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent',
                drop_menu: 0
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received',
                drop_menu: 1
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent',
                drop_menu: 2
            }
        ],
    },
    {
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent',
                drop_menu: 0
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received',
                drop_menu: 1
            }
        ],
    },
    {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received',
                drop_menu: 0
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent',
                drop_menu: 1
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received',
                drop_menu: 2
            }
        ],
    }
]

const app = new Vue( {
    el: '#app',

    data () {
        return {
            contacts,
            icons_search: true,
            search: '',
            user_select: 0,
            sent_message: '',
            is_response: false,
            received_message: '',
            action_users: `Ultimo accesso oggi alle`
        }
    },

    methods: {
        search_focus () {
            this.icons_search = false;
            this.$refs.bar_search.focus();
        },

        search_blur () {
            if ( this.search === '' )
                setTimeout( () => this.icons_search = true, 200 );
        },

        search_icons () {
            this.icons_search = !this.icons_search;
            if ( !this.icons_search ) this.search_focus();
            if ( this.icons_search && this.search !== '' ) this.search = '';
        },

        select_user ( i ) { this.user_select = i; },

        status ( m ) {
            return m.status === 'sent' ? 'sent' : 'received';
        },

        push_message ( user_select, status = 'received', message = 'ok' ) {
            const D = new Date();
            const h = () => ( '0' + D.getHours() ).slice( -2 );
            const m = () => ( '0' + D.getMinutes() ).slice( -2 );
            const s = () => ( '0' + D.getSeconds() ).slice( -2 );
            const d = () => ( '0' + D.getDay() ).slice( -2 );
            const M = () => ( '0' + D.getMonth() ).slice( -2 );
            const y = () => D.getFullYear();
            let obg;

            message = this.robot_response( this.received_message );

            if ( this.sent_message !== '' && !this.is_response ) {
                obg = {
                    date: `${ d() }/${ M() }/${ y() } ${ h() }:${ m() }:${ s() }`,
                    message: `${ app.sent_message }`,
                    status,
                    drop_menu: false
                };
                this.received_message = this.sent_message;
            } else {
                obg = {
                    date: `${ d() }/${ M() }/${ y() } ${ h() }:${ m() }:${ s() }`,
                    message,
                    status,
                    drop_menu: false
                };
            }

            this.contacts[ user_select ].messages.push( obg );

            if ( !this.is_response ) {
                this.action_users = '...sta scrivendo';
                setTimeout( () => {
                    this.is_response = true;
                    this.push_message( user_select, 'received' );
                    this.action_users = `Ultimo accesso oggi alle`;
                }, 1000 );
            };

            const container = this.$el.querySelector( "#chat" );
            container.scrollTop = container.scrollHeight;
        },
        
        click_push_message ( user_select, status ) {
            this.is_response = false;
            this.push_message( user_select, status );
            this.sent_message = '';
        },

        close_drop_menu ( message, i ) {
            message.drop_menu = i;
        },

        delete_message (messages, i ) {
            messages[ this.user_select ].splice( i, 1 );
        },

        robot_response ( sent_message ) {
            switch ( sent_message.toLowerCase() ) {
                case 'ciao':
                    return 'Ciao anche a te!';
                case 'come stai':
                    return 'Sto benissimo, tu come stai?';
                case 'come ti chiami':
                    return 'Mi chiamo Boolzapp &#128512;';
                case 'come va':
                    return 'Va tutto alla grande se tu mi vuoi bene &#129325;';
                case '&#128512;':
                    return '&#128512;';
                default:
                    return 'OK!';
            }
        },

        add_emoticon () {
            this.sent_message += `&#128512;`;
            this.$refs.message_sent.focus();
        },

        last_time_received ( user ) {
            return user.messages[user.messages.length-1].date.slice( 11, 16 );
        }
    },

    computed: {
        search_icon () {
            return this.icons_search ? 'fa-solid fa-magnifying-glass' : 'fa-solid fa-arrow-left';
        },

        sent_button () {
            return this.sent_message !== '' ? 'fa-solid fa-circle-right' : 'fa-solid fa-microphone';
        },

        messages () {
            return this.contacts.map( e => e.messages );
        }
    }
} );