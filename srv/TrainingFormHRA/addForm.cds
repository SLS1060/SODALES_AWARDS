/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 20/04/2026                                                     */
/* Application Name             : Training Form                                                         */
/* Library Name 				: trainingFormHandlers.js            			                 */
/* Functionality                : All post functions which are used for add Training Form               */
/*************************************************************************************************/
using SDL from '../../db/awards';

service trainingFormHRA{

  //MASTER DATE - Training Type
  entity nK2h37sKzzBtxkqG as projection on SDL.M.TRAININGTYPE;

//MASTER DATE - Training Type
  entity LQrp9ewvWHHb1dyB as projection on SDL.M.TRAININGROLE;

    // EMPLOYEE DETAILS - MASTER DATA

  entity RhWMdFK6sh0ZGegz as projection on SDL.M.EMPLOYEEDETAILS;
  
  entity GlHfuLBLniz5sdf7 as projection on SDL.T.FORMLPAGE;

    entity rciyHQLATCrvyqPM as projection on SDL.T.EMPLOYEEDETAILS;

    // View Y8RqqUfrPFRXWA5J(empid: String(250)) as select from
    // SDL.T.EMPLOYEEDETAILS(empid::empid)
    // {*};
    


    /**********************POST SERVICE********************/

    action nnj2SMfWpAxlxnnk(D4OXYPALUYAIDNSO: String) returns String;

    //Acept Reject Status
    action qmU9hLZZckICSjDa(D4OXYPALUYAIDNSO: String) returns String;
    
}