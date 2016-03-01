import React from 'react';
import Immutable from 'immutable';

let map1=Immutable.Map({a:1,b:2,c:3});
// console.log(map1.get('b'));
// let map2=map1.set('b',333);
// console.log(map1.get('b'));
// console.log(map2.get('b'));

let list1=Immutable.List.of(1,2,3);
console.log(list1);
console.log(list1.get(0));

class ImmutableApp extends React.Component {
    constructor() {
        super();
    }
    render(){
        return(
            <div>imutable</div>
        )
    }
}

module.exports=ImmutableApp
