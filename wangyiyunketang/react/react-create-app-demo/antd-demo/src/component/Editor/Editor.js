// 建造者模式
function writer(config) {
    this.initer  = new init();
    this.style  = new styleControll();
    this.stater  = new stateControll();
    var finalconfig = this.initer.intiCnfig;
    this.inter.initerDom(finalconfig)
}




function init (){
    this.defaultConfig ={};
}
init.prototype.intiCnfig = function(){
    
}
init.prototype.initDom = function(){
    
}

function styleControll(){}

styleControll.prototype.colorChange = function(){
    
}

styleControll.prototype.sizeChange = function(){
    
}

function stateControll(){
    this.stateArr = [];
    this.nowin = 0;
}

stateControll.prototype.push = function(){

}

stateControll.prototype.go = function(){
    
}

stateControll.prototype.back = function(){
    
}