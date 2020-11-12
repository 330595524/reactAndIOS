<template>
    <div class="xxx">
        <p>123</p>
        <p>123</p>
        <p>123</p>
    </div>
</template>


// 虚拟dom，抽像的描述层

var ob ={
    dom:'div',
    props:{class:'xxx'},
    text:'',
    children:[{
            dom:'p',
            props:{},
            text:'',
    }]
}