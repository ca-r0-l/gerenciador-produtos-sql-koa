import connection from "../dbConnection";
import Response from "../entity/Response";

export default class ProdutosService {

    public async getAll(): Promise<Response> {
        try {
            const pool = await connection;
            const result = await pool.request()
                .query('select * from produtos');
            return new Response(200, result.recordset);
        } catch (err) {
            console.log('ProdutosService file: ', err);
            return new Response(500);
          }
    }
}