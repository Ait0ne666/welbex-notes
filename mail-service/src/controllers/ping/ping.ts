import { Request} from "express"
import { ApiResponse } from "../../dto/api-response";






export interface IPingController {
    pingHandler: (_: Request, res: ApiResponse<string>) => Promise<ApiResponse<string>>;
}


export class PingController implements IPingController {
    public pingHandler = async (_: Request, res: ApiResponse<string>) => {


        return res.status(200).send({
            error: false,
            message: "pong"
        })

    } ;

}







