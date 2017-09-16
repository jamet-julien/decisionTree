/*************************************************
  _____ _   _ _   _  ____ _____ ___ ___  _   _
 |  ___| | | | \ | |/ ___|_   _|_ _/ _ \| \ | |
 | |_  | | | |  \| | |     | |  | | | | |  \| |
 |  _| | |_| | |\  | |___  | |  | | |_| | |\  |
 |_|    \___/|_| \_|\____| |_| |___\___/|_| \_|
 *************************************************/

 /**
  * [getAge description]
  * @return {[type]} [description]
  */
 function grow( iNum){
   this.age += iNum;
 }

 /**
  * [testPrenom description]
  * @return {[type]} [description]
  */
 function testPrenom(){
   return this.prenom == 'julien';
 }

 /**
  * [testNom description]
  * @return {[type]} [description]
  */
 function testNom(){
   return this.nom == 'dupond';
 }

 /**
  * [testAge description]
  * @return {[type]} [description]
  */
 function testAge( iNum){
   return this.age >= iNum;
 }

 /**
  * [final description]
  * @param  {[type]} sMsg [description]
  * @return {[type]}      [description]
  */
 function final( msg){
   document.body.innerHTML +=  this.prenom +' est '+msg+'<br/>';
 }

 /**
  * [tick description]
  * @return {[type]} [description]
  */
 function tick(){
   this.fitness = (this.fitness === undefined)? 0 : this.fitness + 1;
 }

 /**
  * [endTest description]
  * @return {[type]} [description]
  */
 function endTest(){
   console.table( listUser);
 }
/*************************************************
 __     ___    ____
 \ \   / / \  |  _ \
  \ \ / / _ \ | |_) |
   \ V / ___ \|  _ <
    \_/_/   \_\_| \_\
*************************************************/


// MODE DECISION OBJECT
var oStep     = {
  test : 'testPrenom',
  if   : {
    true  : {

        action : [ 'grow', 1],
        test   : [ 'testAge', 18],
        force  : 'true',

        if     : {
          true : {

            test   : 'testNom',

            if     : {
              true  : {
                action : [ 'final', 'majeur et de la famille']
              },
              false : {
                action : [ 'final', 'majeur mais pas de la famille']
              }
            }
          },
          false : {
            action : [ 'final', 'mineur']
          }
        }
    },
    false : {
      action : [ 'final', 'pas connu']
    }
  }
};

// MODE DECISION ARRAY
var aStep = [
  {test   : 'testPrenom'},
  {action : ['grow', 1], test:['testAge', 18], force : 1},
  {test   : 'testNom'},
  {action : [ 'final', 'majeur et de la famille']}
];

// LIST USER
var listUser = [{
  prenom : 'julien',
  age    : 10,
  nom    : 'dupond'

},{

  prenom : 'julien',
  age    : 19,
  nom    : 'dupond'

},{

  prenom : 'denis',
  age    : 5,
  nom    : 'jamet'

},{

  prenom : 'julien',
  age    : 18,
  nom    : 'jamet'
}];

var user = {
  prenom : 'julien',
  age    : 3,
  nom    : 'dupond'
};



DecisionTree.addTick( tick);
DecisionTree.decide( aStep, listUser)
            .then( endTest)
            .catch( function(){ console.log('reject')});
