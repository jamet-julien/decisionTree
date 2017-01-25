/**
 * [_analyse description]
 * @param  {[type]} oStep [description]
 * @param  {[type]} oData [description]
 * @return {[type]}       [description]
 */
function _analyse( promiseResolve, promiseReject, oStep, oData){

  var sResult = 'default', sResult, oNextStep, fAction, aArgs = [];

  if( 'action' in oStep){
    if( oStep.action instanceof Array){
      fAction = oStep.action[0];
      aArgs   = oStep.action[1] || [];
    }else{
      fAction = oStep.action;
    }
    fAction.call( oData, aArgs);
  }

  if( 'test' in oStep){

    sResult = typeof oStep.test === 'function'
              ? oStep.test.call( oData).toString() // call the test with the results from the action
              : oStep.test.toString();

    oNextStep = oStep.if[ sResult] || { action : ()=>{ promiseReject( 'wrong path')}};

    _analyse.apply( this, [ promiseResolve, promiseReject, oNextStep, oData]);

  }else{

    promiseResolve( oData);

  }

};


class DecisionTree{

  /**
   *
   */
  static decide( oStep, oData){

    return new Promise( (promiseResolve, promiseReject) => {
        _analyse.apply( this, [ promiseResolve, promiseReject, oStep, oData]);
    });

  }


}
