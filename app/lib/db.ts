import sql, { IRecordSet } from 'mssql';
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
		{/* connect */}
	    await sql.connect(config);

		{/* Connect to pool and query*/}
		const results = await sql.query(query);
	
	
		const realresult : IRecordSet<any> = results.recordset;
		return realresult;
	} catch(error) {
		return { error };
	}
}
