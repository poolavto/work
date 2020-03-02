require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(VueRouter);

window.store = new Vuex.Store({
    state: {
        zad: []
    },
    mutations: {
        setZadanie(state, zadanie) {
            state.zad = zadanie; //Внимание
            //console.log(state.zadanie)
        }
    },
    actions: {
        getZadanie(context) {
            axios
                .get('/api/v1/zadanie')
                .then(response => {
                    context.commit('setZadanie', response.data)
                });
        }
    }
});

window.store.dispatch('getZadanie');

import ZadanieIndex from './components/zadanie/ZadanieIndex.vue';
import ZadanieCreate from './components/zadanie/ZadanieCreate.vue';
import ZadanieEdit from './components/zadanie/ZadanieEdit.vue';

const routes = [
    {
        path: '/',
        components: {
            zadanieIndex: ZadanieIndex
        }
    },
    {path: '/zadanie/create', component: ZadanieCreate, name: 'createZadanie'},
    {path: '/zadanie/edit/:id', component: ZadanieEdit, name: 'editZadanie'},
]

const router = new VueRouter({ routes })

const app = new Vue({ router }).$mount('#app')