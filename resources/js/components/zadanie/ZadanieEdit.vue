<template>
    <div>
        <div class="container">
        <div class="form-group">
            <router-link to="/" class="btn btn-default">Назад</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading"><h1>Изменение задания</h1></div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-6 form-group">
                            <label class="control-label">Название задания</label>
                            <input type="text" v-model="zadan.name" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 form-group">
                            <label class="control-label">Описание задания</label>
                            <textarea v-model="zadan.description" class="form-control" required></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 form-group">
                            <label class="control-label">Статус задания</label>
                            <select v-model="zadan.status" class="form-control">
                                <option>В работе</option>
                                <option>Сделано</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 form-group">
                            <label class="control-label">Отложить задачу</label>
                            <input  type="datetime-local" v-model="zadan.otlozheno_do" class="form-control" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 form-group">
                            <button class="btn btn-success">Изменить</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            let app = this;
            let id = app.$route.params.id;
            app.zadanId = id;
            axios.get('/api/v1/zadanie/' + id)
                .then(function (resp) {
                    app.zadan = resp.data;
                })
                .catch(function () {
                    alert("Не удалось загрузить компанию")
                });
        },
        data: function () {
            return {
                zadanId: null,
                zadan: {
                    name: '',
                    description: '',
                    status: '',
                    otlozheno_do: '',
                }
            }
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var newZadan = app.zadan;
                //console.log(app.zadanId);
                axios.patch('/api/v1/zadanie/' + app.zadanId, newZadan)
                    .then(function (resp) {
                        window.store.dispatch('getZadanie');
                        app.$router.replace('/');
                    })
                    .catch(function (resp) {
                        alert("Не удалось изменить задание");
                    });
            }
        }
    }
</script>