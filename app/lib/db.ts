import sql, { IRecordSet } from 'mssql';
import { mylog } from './mylogger';
const config: sql.config = {
	user: process.env.MSSQL_USER,
	password: process.env.MSSQL_PASSWORD,
	server: process.env.MSSQL_SERVER??"",
	port: Number(process.env.MSSQL_PORT),
	database: process.env.MSSQL_DATABASE,
	options: {
		encrypt: true,
		trustServerCertificate: true,
		trustedConnection: true,
	},
};

export async function mssql( query:string ) {
	try {
		mylog ("INFO", "db.ts", "mssql","query=",query);
		{/* connect */}
	    const pool = await sql.connect(config);
		// mylog ("INFO", "db.ts", "mssql", "status", pool.connected?"Connected to MSSQL":"Failed to connect to MSSQL");

		{/* Connect to pool and query*/}
		const results = await pool.request().query(query);
		// mylog ("INFO", "db.ts", "mssql","results=",results);
	
	
		const realresult : IRecordSet<any> = results.recordset;
		return realresult;
	} catch(error) {
		mylog ("ERROR", "db.ts", "mssql","error=",error);
		return { error };
	}
}
