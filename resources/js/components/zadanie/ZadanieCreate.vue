<template>
    <div>
        <div class="container">
        <div class="form-group">
            <router-link to="/" class="btn btn-default">Назад</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading"><h1>Создание нового задания</h1></div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-6 form-group">
                            <label class="control-label">Название задания</label>
                            <input type="text" v-model="zadan.name" class="form-control" required>
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
                            <label class="control-label">Отложить задачу</label>
                            <input  type="datetime-local" v-model="zadan.otlozheno_do" class="form-control" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 form-group">
                            <button class="btn btn-success">Создать</button>
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
        data: function () {
            return {
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
                app.zadan.status = 'В работе';
                var newZadan = app.zadan;
                axios.post('/api/v1/zadanie', newZadan)
                    .then(function (resp) {
                        window.store.dispatch('getZadanie');
                        app.$router.push({path: '/'});
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Не удалось создать");
                    });
            }
        }
    }
</script>