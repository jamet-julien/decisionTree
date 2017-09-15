var user = [{
  prenom : 'julien',
  age    : 33,
  nom    : 'DUPOND'
},
{
  prenom : 'denis',
  age    : 55,
  nom    : 'jamet'
},
{
  prenom : 'julien',
  age    : 40,
  nom    : 'jamet'
}];




var oStep     = {
  test : 'testPrenom',
  if   : {
    true  : {
        action : 'getAge',
        test   : 'testAge',
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

/**
 * [getAge description]
 * @return {[type]} [description]
 */
function getAge(){
  this.age -= 15;
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
  return this.nom == 'DUPOND';
}

/**
 * [testAge description]
 * @return {[type]} [description]
 */
function testAge(){
  return this.age >= 18;
}


/**
 * [final description]
 * @param  {[type]} sMsg [description]
 * @return {[type]}      [description]
 */
function final( msg){
  document.body.innerHTML +=  this.prenom +' '+msg+'<br/>';
}

DecisionTree.decide( oStep, user)
            .then( console.log)
            .catch( console.warn);
