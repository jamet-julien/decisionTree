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
 * [_analyseObject description]
 * @param       {[type]} promiseResolve [description]
 * @param       {[type]} promiseReject  [description]
 * @param       {[type]} oStep          [description]
 * @param       {[type]} oData          [description]
 * @param       {[type]} oScope         [description]
 * @constructor
 * @return      {[type]}                [description]
 */
function _analyseObject( promiseResolve, promiseReject, oStep, oData, oScope){

  var sResult = 'default',
      oNextStep, bNext = true,
      arg = [].slice.call( arguments);

  fTick.call( oData);

  if( 'action' in oStep){
    launchFunction( oStep.action, oData, oScope);
  }

  if( 'test' in oStep){

    sResult   = launchFunction( oStep.test, oData, oScope).toString();
    bNext     = ( 'force' in oStep && sResult != oStep.force)? false : bNext;

    if( bNext){
      oNextStep = oStep.if[ sResult] || { action : ()=>{ promiseReject( oData)}};
      arg[ arg.indexOf( oStep) ] = oNextStep;
    }

    _analyseObject.apply( this, arg);

  }else{
    promiseResolve( oData);
  }

};

/**
 * [_analyseArray description]
 * @param       {[type]} promiseResolve [description]
 * @param       {[type]} promiseReject  [description]
 * @param       {[type]} oStep          [description]
 * @param       {[type]} oData          [description]
 * @param       {[type]} oScope         [description]
 * @constructor
 * @return      {[type]}                [description]
 */
function _analyseArray( promiseResolve, promiseReject, aStep, oData, oScope){

  var oStep, bResult = false,
      iLen   = aStep.length,
      aClone = [...aStep].reverse();

  for(;iLen--;){
    oStep   = aClone[iLen];

    fTick.call( oData);

    if( 'action' in oStep){
      launchFunction( oStep.action, oData, oScope);
    }

    if( 'test' in oStep){
      bResult   = launchFunction( oStep.test, oData, oScope);
    }

    if( 'force' in oStep){
      if( !bResult){
        iLen++;
        continue;
      }
    }

    if( !bResult){
      break;
    }

  }

  // fin du script;
  if( bResult){
    promiseResolve( oData);
  }else{
    promiseReject( oData);
  }

};

var fTick = function(){};

/**
 * [oScope description]
 * @type {[type]}
 */
class DecisionTree{

  /**
   * [addTick description]
   * @param {[type]} _fTick [description]
   */
  static addTick( _fTick){
    fTick = _fTick;
  }

  /**
   * [decide description]
   * @param  {[type]} mStep           [description]
   * @param  {[type]} mData           [description]
   * @param  {[type]} [oScope=window] [description]
   * @return {[type]}                 [description]
   */
  static decide( mStep, mData, oScope = window){

    var execute = ( mStep instanceof Array)? _analyseArray : _analyseObject ;

    return new Promise( (promiseResolve, promiseReject) => {

        if( mData instanceof Array){

          mData.map((oData)=>{
            execute.apply( this, [ promiseResolve, promiseReject, mStep, oData, oScope]);
          });

        }else{
          execute.apply( this, [ promiseResolve, promiseReject, mStep, mData, oScope]);
        }

    });

  }


}
