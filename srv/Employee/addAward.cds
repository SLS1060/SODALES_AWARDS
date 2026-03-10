/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 06/03/2026                                                     */
/* Application Name             : Awards                                                         */
/* Library Name 				: sodalesAwardHandler.js            			                 */
/* Functionality                : All post functions which are used for add Awards               */
/*************************************************************************************************/

using SDL from '../../db/awards';

service awardsServiceEmployee {


    // Master Data - Achievement Dropdown
    entity MOLv4pWqzPv7ZaRc as projection on SDL.M.ACHIEVEMENTDATA;

    // Master Data - Category Dropdown
    entity miyG6luPBjUs3qEg as projection on SDL.M.CATEGORYDATA;

    // Master Data - Status Dropdown
    entity ElcprvTzCoKIddwI as projection on SDL.M.STATUSDATA;

    // Master Data - Award Dropdown
    entity ENbVtinaaxWjdJpl as projection on SDL.M.AWARDDATA;

    // Employee Data
    entity bHYFoVGEpHMsvbyX as projection on SDL.M.EMPLOYEEDETAILS;

    // Award Details
    entity mgAsCLaRAYbvApVq as projection on SDL.T.AWARDDEATILS;

    // Attachments Details
    entity eqIOvkYQPikXwyJp as projection on SDL.T.ATTACHMENTDETAILS;

    //Landing Page
    entity rtnkbleyMNoeRMiw as projection on SDL.T.EMPLOYEELANDINGPAGE;

    //add Award
    action b9q2fsan18bqxar0(D4OXYPALUYAIDNSO: String) returns String;

    //Delete Attachment

    action MenppOLcoVyeMVTg(D4OXYPALUYAIDNSO: String) returns String;

    action qmU9hLZZckICSjDa(D4OXYPALUYAIDNSO: String) returns String;

}
