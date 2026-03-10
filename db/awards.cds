namespace SDL;

context M {
    @cds.persistence.exists
    @cds.persistence.calcview
    entity ACHIEVEMENTDATA {
        key MSTDT : Integer64    @title: 'MSTDT: Master Data ID';
            COLID : Integer      @title: 'COLID: Column ID Sequence';
            UNQID : Integer      @title: 'UNQID: Unique ID (SEQ)';
            TYVAL : String(100)  @title: 'TYVAL: Type Value';
            TXVAL : String(1000) @title: 'TXVAL: Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity CATEGORYDATA {
        key MSTDT : Integer64    @title: 'MSTDT: Master Data ID';
            COLID : Integer      @title: 'COLID: Column ID Sequence';
            UNQID : Integer      @title: 'UNQID: Unique ID (SEQ)';
            TYVAL : String(100)  @title: 'TYVAL: Type Value';
            TXVAL : String(1000) @title: 'TXVAL: Text Value';
    }


    @cds.persistence.exists
    @cds.persistence.calcview
    entity STATUSDATA {
        key MSTDT : Integer64    @title: 'MSTDT: Master Data ID';
            COLID : Integer      @title: 'COLID: Column ID Sequence';
            UNQID : Integer      @title: 'UNQID: Unique ID (SEQ)';
            TYVAL : String(100)  @title: 'TYVAL: Type Value';
            TXVAL : String(1000) @title: 'TXVAL: Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity AWARDDATA {
        key ANMID : Integer64    @title: 'ANMID: Primary Key';
            UNQID : Integer      @title: 'UNQID: Unique Id';
            ANAME : String(1000) @title: 'ANAME: Award Name';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity EMPLOYEEDETAILS {
        key EMPID : String(30)  @title: 'EMPID: Employee Id';
            EMPNM : String(250) @title: 'EMPNM: Employee Name';
            EMPPE : LargeString @title: 'EMPPE: Employee personal email';
            EMPST : String(10)  @title: 'EMPST: Employee status';
            CNTRY : LargeString @title: 'CNTRY: Employee country';
            ECITY : LargeString @title: 'ECITY: Employee city';
            EMADD : LargeString @title: 'EMADD: Employee Address';
            MGRID : String(30)  @title: 'MGRID: Manager Id';
            MGRNM : String(250) @title: 'MGRNM: Manager Name';
            ORGNM : LargeString @title: 'ORGNM: Organization name';
            GENDR : String(1)   @title: 'GENDR: Gender';
            EMPTP : String(20)  @title: 'EMPTP: Employee Type';
            USRID : String(30)  @title: 'USRID: User ID';
            DEPTC : String(10)  @title: 'DEPTC: Department Code';
            DEPNM : String(200) @title: 'DEPNM: Deparment Name';
            VCPNM : String(250) @title: 'VCPNM: Vice Precident Name';
            VCPID : String(30)  @title: 'VCPID: Vice Precident Id';
            EUNIT : String(250) @title: 'EUNIT: Employee Unit';
            PHONE : String(50)  @title: 'PHONE: Phone Number';
            MGREM : String(250) @title: 'MGREM: Manager Email Address';
            LICNM : String(100) @title: 'LICNM: Licence number';
            SUPID : String(30)  @title: 'SUPID: Supervisor Id';
            SUPNM : String(250) @title: 'SUPNM: Supervisor Name';
            SUPML : String(250) @title: 'SUPML: Supervisor Mail';
            EMAIL : String(250) @title: 'EMAIL: Official Email';
            HRBID : String(30)  @title: 'HRBID: HRBP Id';
            STRET : String(250) @title: 'STRET: Street';
            STATE : String(250) @title: 'STATE: State';
            ZIPCD : String(20)  @title: 'ZIPCD: Zipcode';
            BIRDT : Date        @title: 'BIRDT: Date Of Birth';
            HIRDT : Date        @title: 'HIRDT: Hired Date';
            EINDT : Integer     @title: 'EINDT: EIN';
            POSIT : String(500) @title: 'POSIT: Position';
            DIVSN : String(30)  @title: 'DIVSN: Department Division';
            ISDEL : String(1)   @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
    }


    // Rolewise Application path stored which are used for sementic id at BTP
    @cds.persistence.exists
    @cds.persistence.calcview
    entity RPLEWISEAPPPATH(INRGUID: String(20)) {
        key RLPID : Integer;
            ROLPH : String(250);
            RGUID : String(20);
            REBHF : Integer;
            ISDEL : String(1);
    }

}

context T {
    @cds.persistence.exists
    @cds.persistence.calcview
    entity AWARDDEATILS {
        key AWRID : Integer64    @title: 'AWRID: Award ID - Primary Key';
            EMPID : String(50)   @title: 'EMPID: Employee ID';
            AWARD : Integer      @title: 'AWARD: AWARD';
            ACMNT : Integer      @title: 'ACMNT: Achivement (Dropdown)';
            CATEG : Integer      @title: 'CATEG: Award Category';
            NOTES : String(5000) @title: 'NOTES: Notes';
            STATS : Integer      @title: 'STATS: Status';
            REPBY : String(50)   @title: 'REPBY: Reported By';
            REPDT : Date         @title: 'REPDT: Reported Date';
            AWRDT : Date         @title: 'AWRDT: Award Date';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity ATTACHMENTDETAILS {
        key ATHID : Integer64   @title: 'ATHID: Attachment Id - Primary Key';
            AWRID : Integer     @title: 'AWRID: Award Id';
            ATTNM : String(250) @title: 'ATTNM: Attachment Name';
            TITLE : String(250) @title: 'TITLE: Document Title';
            OBJID : String(50)  @title: 'OBJID: Object ID';
            URLDT : String(500) @title: 'URLDT: URL';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity LANDINGPAGE {
        key AWRID : Integer64    @title: 'AWRID: Award ID - Primary Key';
            EMPID : String(50)   @title: 'EMPID: Employee ID';
            AWARD : Integer      @title: 'AWARD: AWARD';
            ACMNT : Integer      @title: 'ACMNT: Achivement (Dropdown)';
            CATEG : Integer      @title: 'CATEG: Award Category';
            NOTES : String(5000) @title: 'NOTES: Notes';
            STATS : Integer      @title: 'STATS: Status';
            REPBY : String(50)   @title: 'REPBY: Reported By';
            REPDT : Date         @title: 'REPDT: Reported Date';
            AWRDT : Date         @title: 'AWRDT: Award Date';
            ANAME : String(1000) @title: 'ANAME: Certification Name';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity HRLANDINGPAGE {
        key AWRID : Integer64    @title: 'AWRID: Award ID - Primary Key';
            EMPID : String(50)   @title: 'EMPID: Employee ID';
            AWARD : Integer      @title: 'AWARD: AWARD';
            ACMNT : Integer      @title: 'ACMNT: Achivement (Dropdown)';
            CATEG : Integer      @title: 'CATEG: Award Category';
            NOTES : String(5000) @title: 'NOTES: Notes';
            STATS : Integer      @title: 'STATS: Status';
            REPBY : String(50)   @title: 'REPBY: Reported By';
            REPDT : Date         @title: 'REPDT: Reported Date';
            AWRDT : Date         @title: 'AWRDT: Award Date';
            ANAME : String(1000) @title: 'ANAME: Certification Name';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity HRANALYSTLANDINGPAGE {
        key AWRID : Integer64    @title: 'AWRID: Award ID - Primary Key';
            EMPID : String(50)   @title: 'EMPID: Employee ID';
            AWARD : Integer      @title: 'AWARD: AWARD';
            ACMNT : Integer      @title: 'ACMNT: Achivement (Dropdown)';
            CATEG : Integer      @title: 'CATEG: Award Category';
            NOTES : String(5000) @title: 'NOTES: Notes';
            STATS : Integer      @title: 'STATS: Status';
            REPBY : String(50)   @title: 'REPBY: Reported By';
            REPDT : Date         @title: 'REPDT: Reported Date';
            AWRDT : Date         @title: 'AWRDT: Award Date';
            ANAME : String(1000) @title: 'ANAME: Certification Name';
    }
}
