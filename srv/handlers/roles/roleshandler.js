const { MODULE_NAME } = require("../../utils/constants");

async function isEmp(req) {
    try {
        let result = await cds.run(`SELECT COUNT(1) AS CNT
                                    FROM SDL_T_USBLK WHERE LOWER(USRID) = LOWER(?) AND ISDEL = '0' AND BLKFG = '1' ;`, [req.user?.id]);
        if (result[0].CNT > 0) {
            req.reject(403, `User ${req.user.id} is not authorized to access.`);
        }
        // console.log(req);

	let result2 = await cds.run(`SELECT COUNT(1) AS CNT
                                    FROM SDL_T_USREP WHERE LOWER(EMPID) = LOWER(?) AND ISDEL = '0';`, [req.user?.id]);
        if (result2[0].CNT = 0) {
            req.reject(403, `User ${req.user.id} is not authorized to access.`);
        }

 
    } catch (error) {
        throw error;
    }
}

async function isHR(req) {
    try {
        let result = await cds.run(`SELECT COUNT(1) AS CNT
                                    FROM SDL_T_USBLK WHERE LOWER(USRID) = LOWER(?) AND ISDEL = '0' AND BLKFG = '1' ;`, [req.user?.id]);
        if (result[0].CNT > 0) {
            req.reject(403, `User ${req.user.id} is not authorized to access.`);
        }
        // console.log(req);

	let result2 = await cds.run(`SELECT COUNT(1) AS CNT
                                    FROM SDL_T_USERHR WHERE LOWER(EMPID) = LOWER(?) AND ISDEL = '0';`, [req.user?.id]);
        if (result2[0].CNT = 0) {
            req.reject(403, `User ${req.user.id} is not authorized to access.`);
        }

 
    } catch (error) {
        throw error;
    }
}

async function isHRA(req) {
    try {
        let result = await cds.run(`SELECT COUNT(1) AS CNT
                                    FROM SDL_T_USBLK WHERE LOWER(USRID) = LOWER(?) AND ISDEL = '0' AND BLKFG = '1' ;`, [req.user?.id]);
        if (result[0].CNT > 0) {
            req.reject(403, `User ${req.user.id} is not authorized to access.`);
        }
        // console.log(req);

	let result2 = await cds.run(`SELECT COUNT(1) AS CNT
                                    FROM SDL_T_USERHRA WHERE LOWER(EMPID) = LOWER(?) AND ISDEL = '0';`, [req.user?.id]);
        if (result2[0].CNT = 0) {
            req.reject(403, `User ${req.user.id} is not authorized to access.`);
        }

 
    } catch (error) {
        throw error;
    }
}

module.exports={
    isEmp,
    isHR,
    isHRA
}