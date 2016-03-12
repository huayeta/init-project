import React from 'react';
import Immutable from 'immutable';

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}
//
// asyncPrint('hello world', 50);


// let map1=Immutable.Map({a:1,b:2,c:3});
// // console.log(map1.get('b'));
// // let map2=map1.set('b',333);
// // console.log(map1.get('b'));
// // console.log(map2.get('b'));
//
// let list1=Immutable.List.of(1,2,3);
// console.log(list1);
// console.log(list1.get(0));

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
