/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 06/03/2026                                                     */
/* Application Name             : Awards                                                         */
/* Library Name 				: sodalesAwardHandler.js            			                 */
/* Functionality                : All post functions which are used for add Awards               */
/*************************************************************************************************/

using { addAward } from './Employee/addAward';
using { awardsServiceHR } from './HR/addAward';
using { awardsServiceHRAnalyst } from './HRAnalyst/addAward';
using { trainingForm } from './TrainingForm/addForm';
using SDL from '../db/awards';



service mainService{
      // View for Role-wise Application Path, parameterized by INRGUID
    // // @readonly
    // view ASDRToWpy6NGKkoe(INRGUID : String(30)) 
    //     as select from SDL.M.RPLEWISEAPPPATH ( INRGUID : :INRGUID ) { * };

    // Entity for querying a fixed employee 
  @readonly
  entity qfllxbGnRXlizI3G as projection on SDL.M.EMPLOYEEDETAILS
       where upper(USRID) = upper($user.id); // Replace with 'upper($user.id)' for dynamic selection

    @readonly
    entity Nl5EfDzrzfDLWJ5N as projection on SDL.M.GETASEKEY;

}