var a1 = [1, 2, 3, 4];
var a2 = a1.includes(1);
function aa(...args){
    let b={};
    console.log(Object.assign(b,...args));
}
// aa({a:1});

function mixins(...list){
    return function(target){
        Object.assign(target,...list);
    }
}

const Foo={
    fo(){
        console.log('foo');
    }
}

@mixins(Foo)
class myClass {
    constructor() {

    }
}

let obj=new myClass();
console.log(obj.fo());
