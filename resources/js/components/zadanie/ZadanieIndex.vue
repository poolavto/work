<template>
    <div>


        <div class="panel panel-default">
            <div class="panel-heading"><h1>Список заданий</h1></div>
        <div class="form-group">
            <router-link :to="{name: 'createZadanie'}" class="btn btn-success">Создать задание</router-link>
        </div>
            <div class="panel-body">
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Задание</th>
                        <th>Описание</th>
                        <th>Статус</th>
                        <th>Отложено до</th>
                        <th width="100">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="zadan, index in zadanie" v-bind:class="{ 'bg-success': zadan.status === 'Сделано', '': true }">
                        <td>{{ zadan.name }}</td>
                        <td>{{ zadan.description }}</td>
                        <td>{{ zadan.status }}</td>
                        <td>{{ zadan.otlozheno_do }}</td>
                        <td class="text-center">
                            <router-link :to="{name: 'editZadanie', params: {id: zadan.id}}" class="btn btn-xs btn-default mb-1">
                                Редактировать
                            </router-link>
                            <a href="#"
                               class="btn btn-xs btn-danger"
                               v-on:click="deleteEntry(zadan.id, index)">
                                Удалить
                            </a>
                            <a href="#"
                               v-if="zadan.status === 'В работе'"
                               class="btn btn-xs btn-primary mt-1"
                               v-on:click="finishEntry(zadan, index)">
                                Выполнил
                            </a>
                            <a href="#"
                               v-if="zadan.status === 'Сделано'"
                               class="btn btn-xs btn-primary mt-1"
                               v-on:click="resumeEntry(zadan, index)">
                                Вернуться к выполнению
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        /*data: function () {
            return {
                zadanie: []
            }
        },*/

        /*

        data: function () {
            return {
                zadanie: window.store.state.zad
            }
        },*/

        computed: {
            zadanie: function () {
                return window.store.state.zad
            }
        },



        methods: {
            deleteEntry(id, index) {
                if (confirm("Дейстительно удалить задание?")) {
                    var app = this;
                    axios.delete('/api/v1/zadanie/' + id)
                        .then(function (resp) {
                            app.zadanie.splice(index, 1);
                        })
                        .catch(function (resp) {
                            alert("Не удалось удалить задание");
                        });
                }
            },
            finishEntry(zadan, index){
                zadan.status = 'Сделано';
                axios.patch('/api/v1/zadanie/' + zadan.id, zadan)
            },
            resumeEntry(zadan, index){
                zadan.status = 'В работе';
                axios.patch('/api/v1/zadanie/' + zadan.id, zadan)
            }
        }
    }
</script>