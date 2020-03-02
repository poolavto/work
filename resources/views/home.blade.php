@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="panel panel-default">
                        <router-view name="zadanieIndex"></router-view>
                        <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
@endsection
