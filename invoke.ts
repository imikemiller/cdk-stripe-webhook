import * as http from "http";
import { handler } from "./lib/handler/index";
import * as dotenv from "dotenv";
import { APIGatewayProxyResult } from "aws-lambda";

dotenv.config({ path: "./.env.local" });

const PORT = 4242;
const IP = "127.0.0.1";
http
  .createServer((request, response) => {
    let chunks: Array<Buffer> = [];
    request
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        // @ts-ignore
        handler({
          body: Buffer.concat(chunks).toString(),
          headers: request.headers as { [name: string]: string },
        }).then((result: APIGatewayProxyResult) => {
          console.log(result);
          // @ts-ignore
          response.writeHead(result.statusCode, result.headers);
          response.write(result.body);
          response.end();
        });
      });
  })
  .listen(PORT, IP)
  .on("listening", () => console.log(`Listening on ${IP}:${PORT}`));
