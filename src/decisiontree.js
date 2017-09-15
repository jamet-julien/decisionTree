/**
 * [launchFunction description]
 * @param  {[type]} mExec      [description]
 * @param  {[type]} currentObj [description]
 * @param  {[type]} oScope     [description]
 * @return {[type]}            [description]
 */
function launchFunction( mExec, currentObj, oScope){

  var result = null, sActionName, mArgs = [];
  [ sActionName, mArgs] = ( mExec instanceof Array)? mExec : [ mExec, []];
  return oScope[sActionName].apply( currentObj, ( mArgs instanceof Array)? mArgs : [ mArgs]);
}

/**
 * [_analyse description]
 * @param       {[type]} promiseResolve [description]
 * @param       {[type]} promiseReject  [description]
 * @param       {[type]} oStep          [description]
 * @param       {[type]} oData          [description]
 * @param       {[type]} oScope         [description]
 * @constructor
 * @return      {[type]}                [description]
 */
function _analyse( promiseResolve, promiseReject, oStep, oData, oScope){

  var sResult = 'default',
      oNextStep,
      fAction,
      arg = [].slice.call( arguments);

  if( 'action' in oStep){
    launchFunction( oStep.action, oData, oScope);
  }

  if( 'test' in oStep){

    sResult   = launchFunction( oStep.test, oData, oScope).toString();
    oNextStep = oStep.if[ sResult] || { action : ()=>{ promiseReject( 'wrong path')}};

    arg[ arg.indexOf(oStep) ] = oNextStep;

    _analyse.apply( this, arg);

  }else{

    promiseResolve( oData);

  }

};


class DecisionTree{

  /**
   *
   */
  static decide( oStep, oData, oScope = window){

    return new Promise( (promiseResolve, promiseReject) => {
        _analyse.apply( this, [ promiseResolve, promiseReject, oStep, oData, oScope]);
    });

  }


}
